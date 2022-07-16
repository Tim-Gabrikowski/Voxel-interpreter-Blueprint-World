# Voxel interpreter

## File

file ending in .vox

line ending with ;

one line = one object

Comment with #

## Functions

| name |               params               |         example          |      description      |
| :--: | :--------------------------------: | :----------------------: | :-------------------: |
| vox  |          posX, posY, posZ          |     `vox(10, 3, 5)`      | spawns a single voxel |
| pxz  |    posX, posY, posZ, lenX, lenZ    |  `pxz(5, 13, 2, 6, 7)`   |  create a X-Z Plane   |
| pxy  |    posX, posY, posZ, lenX, lenY    |  `pxy(5, 13, 2, 6, 7)`   |  create a X-Y Plane   |
| pyz  |    posX, posY, posZ, lenY, lenZ    |  `pyz(5, 13, 2, 6, 7)`   |  create a Y-Z Plane   |
| cub  | posX, posY, posZ, lenX, lenY, lenZ | `qad(15, 5, 9, 2, 2, 4)` |     create a Cube     |
