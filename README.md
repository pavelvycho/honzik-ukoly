# Honzíkovy úkoly

Devět úkolů pro předškoláka na myšlení, pozornost a uvolnění ruky.
Celá appka je jeden soubor `index.html` — žádné knihovny, žádné sestavování.

## Zveřejnění přes GitHub Desktop

1. V GitHub Desktop **File → Add local repository…** a vyber tuhle složku.
   (Repozitář je už založený a má první commit, takže ho rovnou uvidí.)
2. Klikni **Publish repository**. Jméno nech `honzik-ukoly`, a **odškrtni
   „Keep this code private"** — Pages na bezplatném účtu z privátního
   repozitáře nefungují.
3. Na `github.com` v repozitáři **Settings → Pages**.
   *Source*: **Deploy from a branch**, *Branch*: **main**, složka **/ (root)** → **Save**.
4. Za minutu až dvě se nahoře objeví adresa `https://TVOJEJMENO.github.io/honzik-ukoly/`.

## Přidání na plochu tabletu

Otevři tu adresu v Chromu na tabletu. Na úvodní obrazovce se objeví tlačítko
**Přidat na plochu** — appka se uloží jako ikona a spouští se na celou obrazovku
bez adresního řádku. Pokud se tlačítko neukáže, jde to i ručně: tři tečky vpravo
nahoře → *Přidat na plochu*.

Po prvním otevření funguje i bez internetu.

## Aktualizace

Nahraď `index.html` novou verzí, v GitHub Desktopu napiš popis změny,
**Commit to main** a **Push origin**. Na tabletu se nová verze načte sama při
příštím spuštění (service worker bere stránku nejdřív ze sítě a z paměti jen
tehdy, když není signál).

Když bys měnil i ikony nebo `manifest.webmanifest`, zvyš v `sw.js` číslo
v `const CACHE = "honzik-ukoly-v1"` na `v2` — jinak si tablet nechá ty staré.

## Co je ve složce

| Soubor | K čemu |
| --- | --- |
| `index.html` | Celá appka — hry jsou v poli `HRY` zhruba v půlce souboru |
| `manifest.webmanifest` | Jméno, barvy a ikony pro instalaci na plochu |
| `sw.js` | Service worker — stará se o chod bez připojení |
| `ikona-*.png` | Ikony na plochu (192, 512 a maskable 512) |
| `.nojekyll` | Vypne na Pages zbytečné zpracování Jekyllem |

Zdrojové skripty, kterými se appka i tištěné pracovní listy generují, jsou
ve složce `zdroj` o úroveň výš — do repozitáře nepatří.
