"""Local preview of the site without Jekyll: python3 preview.py  ->  _preview/index.html
(GitHub Pages builds the real site automatically; this script is only for checking changes offline.)"""
import os, re, shutil, datetime, yaml, markdown
from liquid import Environment, FileSystemLoader
root=os.path.dirname(os.path.abspath(__file__))
md=lambda s: markdown.markdown(str(s or ''), extensions=['extra'])
env=Environment(loader=FileSystemLoader(os.path.join(root,'_includes')))
env.filters['markdownify']=md
data={f[:-4]:yaml.safe_load(open(os.path.join(root,'_data',f),encoding='utf-8')) for f in os.listdir(os.path.join(root,'_data')) if f.endswith('.yml')}
cfg=yaml.safe_load(open(os.path.join(root,'_config.yml'),encoding='utf-8'))
site=dict(cfg, data=data, time=datetime.datetime.now())
def split(path):
    t=open(path,encoding='utf-8').read(); m=re.match(r'^---\n(.*?)\n---\n',t,re.S)
    return (yaml.safe_load(m.group(1)) or {}, t[m.end():]) if m else ({},t)
fm,body=split(os.path.join(root,'index.html'))
body=re.sub(r"{%\s*include\s+([\w.\-]+)\s*%}",r"{% include '\1' %}",body)
content=env.from_string(body).render(site=site,page=fm)
_,lay=split(os.path.join(root,'_layouts',fm['layout']+'.html'))
html=env.from_string(lay).render(site=site,page=fm,content=content)
out=os.path.join(root,'_preview'); shutil.rmtree(out,ignore_errors=True); os.makedirs(out)
shutil.copytree(os.path.join(root,'assets'),os.path.join(out,'assets'))
open(os.path.join(out,'index.html'),'w',encoding='utf-8').write(html)
print('Preview written to',os.path.join(out,'index.html'))
