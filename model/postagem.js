let client = require('mongodb').MongoClient;

module.exports = class Postagem {

    static connect (callback) {
        return client.connect('mongodb://localhost:27017',
                {useNewUrlParser: true});
    }

    static get (busca,callback) {
        return Postagem.connect().then((conn) => {
            let db = conn.db('projeto02');
            return db.collection('postagens').find({ titulo: { $regex: "^"+busca, $options:"i" } }).collation({locale: "en"}).sort({ titulo: 1 }).toArray();
        });
    }

    static insert (titulo, descricao) {
        return Postagem.connect().then((conn) => {
            let db = conn.db('projeto02');
            db.collection('postagens').insertOne({titulo: titulo,
                                                descricao: descricao});
        });
    }


}
