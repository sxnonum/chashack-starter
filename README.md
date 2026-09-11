# B&B

Vårt hackathon-projekt från Chas Academy hackathon.

## Laget

- Alexander Aziz
- Abdulqadir Nur

## Om projektet

En hemsida byggd med HTML, CSS och JavaScript under en dags hackathon,
för att lära oss grunderna i git, GitHub och webbutveckling — plus en
rad extrafunktioner (tema-växling, medlemssök, konfetti, nedräkning,
formulär med validering m.m.).

## Publicerad sida

🔗 [Fyll i er GitHub Pages-länk här när den är live]

## LinkedIn-inlägg

🔗 [Klistra in länken till ert LinkedIn-inlägg här]

## Bra att veta för granskarna

- **Easter egg:** skriv `chas` var som helst på sidan (tangentbordet, ingen
  ruta behöver vara markerad) för att utlösa det.
- **Ljudknapp:** knappen "🔊 Spela ljud" spelar en kort ton genererad med
  Web Audio API, ingen ljudfil behövs.
- **API:** "Hämta ett livstips"-knappen anropar
  [api.adviceslip.com](https://api.adviceslip.com/advice). Om anropet
  misslyckas visas texten "Kunde inte hämta data just nu, testa igen."
- **Sidan minns er:** valt tema (mörkt/ljust) och klickräknaren sparas i
  `localStorage` och finns kvar efter omladdning.
- **Nedräkningen** pekar just nu 5 timmar framåt som platshållare — ändra
  `countdownTarget` i `script.js` till er faktiska redovisningstid.
- **Kontrast:** textfärgerna (`--text`, `--muted`) är valda för att hålla
  minst 4.5:1 kontrast mot bakgrunden i både mörkt och ljust läge.
- **Lagbild:** `team-photo-placeholder.svg` är en platshållare. Byt ut filen
  mot ett riktigt foto på laget och uppdatera `src` i `index.html`.

## Pull request med review (görs manuellt av laget)

1. Skapa en ny branch: `git checkout -b min-andring`
2. Gör en ändring, committa och pusha branchen: `git push origin min-andring`
3. Gå till repot på GitHub → **Pull requests** → **New pull request**
4. Be en lagkamrat granska och godkänna (**Review** → **Approve**)
5. Klicka **Merge pull request**