# Fotografía corporativa

Las seis imágenes de las secciones inferiores proceden exclusivamente del archivo adjunto por el usuario, conservado en `anlice-secciones-original.png`. Se obtuvieron mediante recortes locales, sin buscar, descargar, generar ni sustituir fotografías por otras imágenes. El collage completo no se muestra en la página.

| Sección | Archivo recortado | Recorte en píxeles (ancho × alto + x + y) |
| --- | --- | --- |
| Ventas 360 | `anlice-ventas.png` | `550x245+2+0` — superior izquierda |
| Liderazgo 360 | `anlice-liderazgo.png` | `552x245+560+0` — superior central |
| Experiencia 360 | `anlice-experiencia.png` | `552x245+1120+0` — superior derecha |
| Metodología ANLICE | `anlice-metodologia.png` | `732x315+940+361` — central derecha |
| Nosotros | `anlice-nosotros.png` | `433x262+455+679` — inferior central |
| Cambios que merecen contarse | `anlice-resultados.png` | `432x262+1240+679` — inferior derecha |

Los recortes PNG conservan los píxeles del adjunto y excluyen sus títulos, botones, iconos y textos de maquetación. Los textos y botones de la web permanecen como contenido HTML independiente. Se eliminaron los seis archivos de fotografías anteriores y sus referencias externas.

Para reproducir un recorte con ImageMagick:

```sh
convert assets/anlice-secciones-original.png -crop 550x245+2+0 +repage assets/anlice-ventas.png
```

Netlify Image CDN optimiza únicamente estos recursos locales para cada pantalla; no se utilizan fotografías remotas. Los tamaños solicitados no superan la resolución original de los recortes. Las imágenes se cargan de forma diferida y mantienen un archivo local de respaldo. El HERO, su imagen, su marcado y sus estilos se conservan sin cambios.
