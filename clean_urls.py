
with open('urls.txt') as f:
    urls = set(x.split('?')[0] for x in f.read().split('\n'))


print(len(urls))

with open('cleaned_urls.txt', 'w') as f:
    f.write('\n'.join(urls))