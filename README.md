# RordonGemzi Backend
Prije nego sto uradite *push*, osigurajte da se za bazu koriste kredencijali:
- **Username:** root
- **Password:** 

odnosno da nema passworda. Također provjeriti da link u `loaders\sequelize.js` glasi:
~~~~
mysql://root@localhost:3306/rordongemzi
~~~~
a ne:
~~~~
mysql://root:root@localhost:3306/rordongemzi
~~~~
## Postavljanje na VM
- **VM Password:** TS2020Project

Ako se nova verzija stavlja na VM, prvo isključiti trenutnu tako što se otvori konzola (`cmd`) sa administratorskim privilegijama, te se zatim unese:
~~~~
cd C:\nssm\win64
nssm stop app
~~~~

Otvoriti folder `C:\app\`, obrisati folder `Backend`, te staviti novi. Zatim instalirati pakete preko npm:
~~~~
cd C:\app\Backend
npm install
~~~~

Nakon ovoga treba još ponovo pokrenuti servis za backend:
~~~~
cd C:\nssm\win64
nssm stop app
~~~~
