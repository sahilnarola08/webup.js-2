cd ../gantt-component
echo gone in gantt-component
call npm link
echo link gantt-component done
pause 

cd ../ketchup/packages/ketchup
echo gone in ketchup
call npm link
echo link ketchup done
pause 
cd ../ketchup-react
echo gone in ketchup-react
call npm link
echo link ketchup-react done
pause
cd ../../../kokos-ketchup-converters
echo gone in kokos-ketchup-converters
call npm link
echo link kokos-ketchup-converters done
pause
cd ../webup.js
echo gone in webup.js
call npm link @sme.up/gantt-component @sme.up/ketchup @sme.up/ketchup-react @sme.up/kokos-ketchup-converters
echo link ketchup, ketchup-react and kokos-ketchup-converters in webup.js done
pause