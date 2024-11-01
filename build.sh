#!/bin/sh

cd "$(dirname "$(realpath "$0")")"

# copy images to dist
rm -r obsidian/dist
rm obsidian/src/images.ts
mkdir -p obsidian/dist/images/
cp public/images/placeholder-ob.png obsidian/dist/images/placeholder.png
cp -r public/images/cards obsidian/dist/images

# package as blob and include in plugin
sha256sum obsidian/dist/images/* > obsidian/dist/images/CHECKSUM
tar zcvf images.tar.gz -C obsidian/dist images
cat>obsidian/src/images.ts<<EOF
export const imageBlob: string = \`$(base64 < images.tar.gz)\`
export const imageHash: string = \`$(cat obsidian/dist/images/CHECKSUM)\`
EOF
rm -f images.tar.gz

# build plugin
cd "obsidian"
cd "${0%/*}"
npm i
npm run build