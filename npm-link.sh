#!/bin/bash

cd ../ketchup/packages/ketchup
echo "gone in ketchup"
npm link
echo "link ketchup done"
cd ../ketchup-react
echo "gone in ketchup-react"
npm link
echo "link ketchup-react done"
cd ../../../kokos-ketchup-converters
echo "gone in kokos-ketchup-converters"
npm link
echo "link kokos-ketchup-converters done"
cd ../webup.js
echo "gone in webup.js"
npm link @sme.up/ketchup @sme.up/ketchup-react @sme.up/kokos-ketchup-converters
echo "link ketchup, ketchup-react and kokos-ketchup-converters in webup.js done"
