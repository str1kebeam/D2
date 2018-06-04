import os
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        with f as open(os.path.join(directory, filename), 'r'):
            for l in f.readlines():
        continue
    else:
        continue
