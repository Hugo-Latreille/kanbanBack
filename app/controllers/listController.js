const { List } = require("../models/");

const listController = {
	getAllLists: async (req, res) => {
		// const lists = await List.findAll();
		const allLists = await List.findAll({
			order: [["position", "ASC"]],
		});
		res.status(200).json(allLists);
	},
	getOneList: async (req, res) => {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			throw new Error("Un problème avec l'id");
		}
		const oneList = await List.findByPk(id);

		if (!oneList) {
			return res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		res.json(oneList);
	},
	createList: async (req, res) => {
		const formData = req.body;
		const { name, position } = req.body;
		console.log(formData);

		if (!name) {
			res.status(400).json({ error: "Missing body parameter: name" });
			return;
		}

		if (name && typeof name !== "string") {
			res.status(400).json({ error: "Invalid type: name should be a string" });
			return;
		}
		if (position && typeof position !== "number") {
			res
				.status(400)
				.json({ error: "Invalid type: position should be a number" });
			return;
		}

		const newList = await List.create(formData);

		res.status(201).json(newList);
	},
	updateList: async (req, res) => {
		const id = Number(req.params.id);
		const body = req.body;
		const { name, position } = req.body;
		console.log(id, req.body);

		if (isNaN(id)) {
			throw new Error("Un problème avec l'id");
		}

		const checkList = await List.findByPk(id);
		if (!checkList) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
			return;
		}

		if (name && typeof name !== "string") {
			res.status(400).json({ error: "Invalid type: name should be a string" });
			return;
		}
		if (position && typeof position !== "number") {
			res
				.status(400)
				.json({ error: "Invalid type: position should be a number" });
			return;
		}

		if (!name && !position) {
			res.status(400).json({
				error:
					"Invalid body. Should provide at least a 'name' or 'position' property",
			});
			return;
		}

		const updateList = await List.update(body, {
			where: { id },
		});

		res.json(updateList);
	},
	deleteList: async (req, res) => {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			throw new Error("Un problème avec l'id");
		}

		const listToDelete = await List.findByPk(id);

		if (!listToDelete) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
			return;
		}

		listToDelete.destroy();
		res.status(204).send("List supprimée");
	},
};

module.exports = listController;
