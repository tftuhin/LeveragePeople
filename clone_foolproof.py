import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

pages = {
    '/': 'index',
    '/about/': 'about',
    '/case-studies/': 'case-studies',
    '/contact/': 'contact',
    '/culture/': 'culture',
    '/quiz/': 'quiz',
    '/strategy/': 'strategy',
    '/talent/': 'talent'
}

base_url = 'https://leveragepeople.us'
session = requests.Session()
session.headers.update({'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)'})

os.makedirs("public/images", exist_ok=True)
os.makedirs("src/components", exist_ok=True)

# Create RawHtml component
raw_html_component = """'use client';
import { useEffect, useRef } from 'react';

export default function RawHtml({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const scripts = Array.from(ref.current.querySelectorAll('script'));
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />;
}
"""
with open("src/components/RawHtml.tsx", "w") as f:
    f.write(raw_html_component)

def download_image(url):
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    if not filename:
        return url
    local_path = f"public/images/{filename}"
    if not os.path.exists(local_path):
        try:
            res = session.get(url, timeout=10)
            res.raise_for_status()
            with open(local_path, 'wb') as f:
                f.write(res.content)
            print(f"Downloaded image: {filename}")
        except Exception as e:
            print(f"Failed to download image {url}: {e}")
            return url
    return f"/images/{filename}"

for path, name in pages.items():
    url = urljoin(base_url, path)
    print(f"Processing {url}...")
    try:
        res = session.get(url, timeout=15)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # 1. Process Head
        head_links = []
        head_scripts = []
        if soup.head:
            for link in soup.head.find_all('link'):
                href = link.get('href')
                if href:
                    link['href'] = urljoin(base_url, href)
                head_links.append(str(link))
            
            for script in soup.head.find_all('script'):
                src = script.get('src')
                if src:
                    script['src'] = urljoin(base_url, src)
                head_scripts.append(str(script))
                
        head_html = "".join(head_links + head_scripts)
        
        # 2. Process Body
        body_class = ""
        body_html = ""
        if soup.body:
            body_class = " ".join(soup.body.get('class', []))
            
            # Download images and rewrite src
            for img in soup.body.find_all('img'):
                src = img.get('src')
                if src:
                    absolute_src = urljoin(base_url, src)
                    local_src = download_image(absolute_src)
                    img['src'] = local_src
                
                # Remove srcset to avoid loading original URLs
                if img.get('srcset'):
                    del img['srcset']
                    
            body_html = "".join(str(tag) for tag in soup.body.contents)
            
        # 3. Write page.tsx
        out_dir = "src/app" if name == 'index' else f"src/app/{name}"
        os.makedirs(out_dir, exist_ok=True)
        
        head_safe = head_html.replace('`', '\\`').replace('$', '\\$')
        body_safe = body_html.replace('`', '\\`').replace('$', '\\$')
        
        page_tsx = f"""import RawHtml from '@/components/RawHtml';

export default function Page() {{
  return (
    <>
      <div dangerouslySetInnerHTML={{{{ __html: `{head_safe}` }}}} style={{{{ display: 'none' }}}} suppressHydrationWarning />
      <div className="{body_class}">
        <RawHtml html={{`{body_safe}`}} />
      </div>
    </>
  );
}}
"""
        # Ensure we use relative path for imports if inside subfolder
        import_path = "../components/RawHtml" if name != 'index' else "./components/RawHtml"
        page_tsx = page_tsx.replace('@/components/RawHtml', import_path)
        
        with open(f"{out_dir}/page.tsx", "w") as f:
            f.write(page_tsx)
            
        print(f"Created Next.js page for {name}")
        
    except Exception as e:
        print(f"Error processing {name}: {e}")

# Create clean layout.tsx
layout_tsx = """export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
"""
with open("src/app/layout.tsx", "w") as f:
    f.write(layout_tsx)
