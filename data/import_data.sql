BEGIN;

INSERT INTO "liste" ("id", "nom", "position") VALUES
(1, 'Tâches', 1),
(2, 'Liste de courses', 2);

INSERT INTO "carte" ("id", "contenu", "position", "couleur", "liste_id") VALUES
(1, 'Ménage', 1, '#5499C7', 1),
(2, 'Dire à Charlelie qu''il est pas si drôle en vrai', 2, '#A93226', 1),
(3, 'Manger du melon', 3, '#2980B9', 1),
(4, 'Viandox', 1, '#C0392B', 2),
(5, 'Couches fuites urinaires', 3, null, 2);

INSERT INTO "label" ("id", "nom", "couleur") VALUES
(1, 'Urgent', '#D35400'),
(2, 'Pas urgent', '#3498DB'),
(3, 'Moyen urgent', '#F4D03F');

INSERT INTO "carte_has_label" ("id", "carte_id", "label_id") VALUES 
(1, 1, 1 ),
(2, 2, 3 ),
(3, 1, 3 ),
(4, 3, 2 ),
(5, 4, 3 ),
(6, 5, 1 );

COMMIT;


--! Question : kesaco ?
-- Postgres avec le fait d'ajouter IDENTITY BY DEFAULT au lieu de ALWAYS ne met pas à jour le curseur de l'incrément de la séquence de façon implicite !
-- Il faut donc mettre à jour la valeur courante de chacune des séquences en séléctionnant l'id maximum de chaque table
--

BEGIN;

SELECT setval('liste_id_seq', (SELECT MAX(id) from "liste"));
SELECT setval('carte_id_seq', (SELECT MAX(id) from "carte"));
SELECT setval('label_id_seq', (SELECT MAX(id) from "label"));
SELECT setval('label_id_seq', (SELECT MAX(id) from "label"));
SELECT setval('carte_has_label_id_seq', (SELECT MAX(id) from "carte_has_label"));


COMMIT;

