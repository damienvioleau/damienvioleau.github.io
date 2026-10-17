# Site personnel — mode d'emploi

Site statique publié gratuitement par **GitHub Pages**. Tout le contenu est dans des fichiers texte ; la mise en page n'a jamais besoin d'être touchée.

## Où modifier quoi

| Je veux changer…                         | Fichier                         |
|------------------------------------------|---------------------------------|
| Nom, affiliations, e-mail, liens, chiffres clés, thèmes de recherche | `_data/profile.yml` |
| Texte de présentation (« About »)        | `_includes/about.md`            |
| Section « Miscellaneous » (texte libre)  | `_includes/misc.md`             |
| Photos de « Miscellaneous »              | `_data/gallery.yml` + `assets/img/` |
| Carrière, distinctions, doctorants, enseignement, conférences invitées, sociétés savantes, témoignages | `_data/cv.yml` |
| Articles de revue                        | `_data/journal.yml`             |
| Articles de conférence                   | `_data/conferences.yml`         |
| Bulletins / colloques                    | `_data/bulletins.yml`           |
| Livres, chapitres, éditions, bilan bibliométrique | `_data/books.yml`      |
| Photo de profil                          | remplacer `assets/img/portrait.jpg` (carrée) |
| Couleurs                                 | haut de `assets/css/style.css`  |

Ajouter un article = copier un bloc de trois lignes en tête de `journal.yml` :

```yaml
- year: 2027
  ref: "Violeau, D., Untel, A. (2027), *Titre en italique*, J. Fluid Mech. **999**:1–20."
  doi: 10.1017/jfm.2027.123
```

Règles YAML à respecter : l'indentation (deux espaces), le tiret en début de bloc, le texte entre guillemets droits `"…"`. La numérotation se fait toute seule.

## Mise en ligne (une seule fois, environ 10 minutes)

1. Créer un compte gratuit sur <https://github.com> (par exemple l'identifiant `dviolea`).
2. Créer un dépôt **public** nommé exactement `<identifiant>.github.io`.
3. Dans le dépôt : *Add file → Upload files*, glisser **le contenu** du dossier `site` (pas le dossier lui-même), puis *Commit changes*.
4. *Settings → Pages* : Source = *Deploy from a branch*, branche `main`, dossier `/ (root)`.
5. Une à deux minutes plus tard, le site est en ligne à `https://<identifiant>.github.io`.

## Modifier ensuite

Ouvrir le fichier sur github.com, cliquer sur le crayon, modifier, *Commit changes*. Le site se met à jour en une à deux minutes. En cas d'erreur de syntaxe, l'onglet *Actions* du dépôt affiche une croix rouge et le message correspondant ; l'ancienne version reste en ligne entre-temps.

## Aperçu local (facultatif)

`python3 preview.py` produit `_preview/index.html` (nécessite `pip install python-liquid markdown pyyaml`).
