const { List } = require("../models/");

const listController = {
	getAllLists: async (req, res) => {
		try {
			// const lists = await List.findAll();
			const ListAvecCartesEtLabels = await List.findAll({
				include: [{ association: "cartes", include: ["labels"] }],
			});
			res.json(ListAvecCartesEtLabels);
		} catch (error) {
			console.error(error);
		}
	},
	getOneList: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneList = await List.findByPk(id);
			res.json(oneList);
		} catch (error) {
			console.error(error);
		}
	},
	createList: async (req, res) => {
		try {
			const formData = req.body;
			console.log(formData);
			// const list = {
			// 	nom: "Brigitte",
			// 	position: 3,
			// };
			await List.create(formData);

			res.send("Nouvelle list créée");
		} catch (error) {
			console.error(error);
		}
	},
	updateList: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const updateList = await List.update(body, {
				where: { id },
			});
			res.json(updateList);
		} catch (error) {
			console.error(error);
		}
	},
	deleteList: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const listToDelete = await List.findByPk(id);
			listToDelete.destroy();
			res.send("List supprimée");
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = listController;
