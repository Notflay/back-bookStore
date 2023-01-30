import BooksVenta from "../model/BooksVenta";

export const createVenta = async (req, res) => {
  try {
    const { body } = req;
    const bookVenta = new BooksVenta({
      isbn13: body.isbn13,
      title: body.title,
      desc: body.desc,
      price: body.price,
      image: body.image,
      cantidad: body.cantidad,
    });
    await bookVenta.save();
    res.status(201).send(bookVenta);
  } catch (error) {
    res.status(501).send(error);
  }
};

export const viewVenta = async (req, res) => {
  try {
    const booksVenta = await BooksVenta.find();
    res.status(201).send(booksVenta);
  } catch (error) {
    res.status(501).send(error);
  }
};

export const deleteVenta = async (req, res) => {
  try {
    const { id } = req.params;

    await BooksVenta.findByIdAndDelete(id);
    res.status(201).send("Eliminado exitosamente");
  } catch (error) {
    res.status(501).send(error);
  }
};

export const updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await BooksVenta.findByIdAndUpdate(id, body);
    res.status(201).send("Actualizado extiosamente");
  } catch (error) {
    res.status(501).send(error);
  }
};
