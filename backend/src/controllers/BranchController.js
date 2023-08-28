const { Branch } = require("../database/connection");

const listAll = async (req, res) => {
  try {
    const branches = await Branch.findAll({ where: { active: 1 } });
    return res.status(200).json({ branches });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findOne = async (req, res) => {
  try {
    //findByPk busca un elemento por la llave primaria de la tabla
    const branch = await Branch.findByPk(req.params.branchId);
    //si devuelve null, es porque no existe ese elemento
    if (branch === null) {
      return res.status(404).json({ error: "Branch not found" });
    } else {
      return res.status(200).json({ branch });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const saveOne = async (req, res) => {
  try {
    const body = req.body;
    if (body && body.name && body.address && body.phone) {
      const branch = await Branch.create(req.body);
      return res.status(201).json({ branch });
    } else {
      return res.status(409).json({ error: "Check parameteres" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateOne = async (req, res) => {
  try {
    const body = req.body || null;

    if (body && body.name && body.address && body.phone) {
      const branch = await Branch.update(req.body, {
        where: { branchId: req.params.branchId },
      });

      return res.status(200).json({ success: "Updated successfuly", branch });
    } else {
      return res.status(409).json({ error: "Check parameters" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteOne = async (req, res) => {
  try {
    await Branch.sequelize
      .query("EXEC logicdelete @branch_id = :branchid", {
        replacements: { branchid: req.params.branchId },
      })
      .then((x) => {
        console.log({ SP_RESP: x });

        if (x.length > 0) {
          return res.status(200).json({ success: "Deleted successfuly" });
        } else {
          return res.status(400).json({ error: "Delete failed" });
        }
      });

    // await Branch.update({active: 0}, {
    //   where: { branchId: req.params.branchId },
    // }).then((x) => {
    //   if (x.length > 0) {
    //     return res.status(200).json({ success: "Deleted successfuly" });
    //   } else {
    //     return res.status(400).json({ error: "Delete failed" });
    //   }
    // });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  listAll,
  findOne,
  saveOne,
  updateOne,
  deleteOne,
};
