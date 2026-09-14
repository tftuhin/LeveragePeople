import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

pages = {
    '/': 'index_static.html',
    '/about/': 'about.html',
    '/case-studies/': 'case-studies.html',
    '/contact/': 'contact.html',
    '/culture/': 'culture.html',
    '/quiz/': 'quiz.html',
    '/strategy/': 'strategy.html',
    '/talent/': 'talent.html'
}

base_url = 'https://leveragepeople.us'
session = requests.Session()
session.headers.update({'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})

os.makedirs("public/images", exist_ok=True)

def download_image(url):
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    if not filename: return url
    local_path = f"public/images/{filename}"
    if not os.path.exists(local_path):
        try:
            res = session.get(url, timeout=10)
            res.raise_for_status()
            with open(local_path, 'wb') as f:
                f.write(res.content)
            print(f"Downloaded image: {filename}")
        except:
            return url
    return f"/images/{filename}"

for path, filename in pages.items():
    url = urljoin(base_url, path)
    print(f"Processing {url}...")
    try:
        res = session.get(url, timeout=15)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Make all head links/scripts absolute so they load from live server
        if soup.head:
            for link in soup.head.find_all('link', href=True):
                link['href'] = urljoin(base_url, link['href'])
            for script in soup.head.find_all('script', src=True):
                script['src'] = urljoin(base_url, script['src'])
                
        # Make body scripts absolute
        if soup.body:
            for script in soup.body.find_all('script', src=True):
                script['src'] = urljoin(base_url, script['src'])
                
            # Download images and rewrite src
            for img in soup.body.find_all('img', src=True):
                absolute_src = urljoin(base_url, img['src'])
                local_src = download_image(absolute_src)
                img['src'] = local_src
                if img.get('srcset'):
                    del img['srcset']
                    
        with open(f"public/{filename}", "w") as f:
            f.write(str(soup))
            
        print(f"Created {filename}")
        
    except Exception as e:
        print(f"Error processing {path}: {e}")
