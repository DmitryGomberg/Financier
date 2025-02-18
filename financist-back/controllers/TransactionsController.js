import {db} from "../server.js";

export const allTransactions = (req, res) => {
    const query = 'SELECT * FROM transactions';

    db.query(query, (err, results)=>{
       if(err){
           console.log('Ошибка выполнения запроса к бд:', err);
           res.status(500).json({error: 'Ошибка на сервере'})
       } else {
           res.json(results)
       }
    });
}

export const getTransactionById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM transactions WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.log('Ошибка выполнения запроса к бд:', err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Транзакция не найдена' });
        } else {
            res.json(results[0]);
        }
    });
};

export const deleteTransactionById = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM transactions WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса к бд:', err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Транзакция не найдена' });
        } else {
            res.status(200).json({ message: 'Транзакция удалена' });
        }
    });
};

export const updateTransactionById = (req, res) => {
    const { id } = req.params;
    const { type, contractId, provider, date, price, description } = req.body;

    const query = 'UPDATE transactions SET type = ?, contractId = ?, provider = ?, date = ?, price = ?, description = ? WHERE id = ?';
    const values = [type, contractId, provider, date, price, description, id];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса к бд:', err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Транзакция не найдена' });
        } else {
            res.status(200).json({ message: 'Транзакция обновлена' });
        }
    });
};

export const addTransaction = (req, res) => {
    const { type, contractId, provider, date, price, description } = req.body;

    const checkContractQuery = 'SELECT id FROM contracts WHERE id = ?';
    db.query(checkContractQuery, [contractId], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса к бд: ', err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        } else if (results.length === 0) {
            res.status(400).json({ error: 'Неверный contractId' });
        } else {
            const query = 'INSERT INTO transactions (type, contractId, provider, date, price, description) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [type, contractId, provider, date, price, description];

            db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Ошибка выполнения запроса к бд: ', err);
                    res.status(500).json({ error: 'Ошибка на сервере' });
                } else {
                    res.status(201).json({ message: 'Транзакция добавлена', transactionId: results.insertId });
                }
            });
        }
    });
};

export const getExpensesByContractId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM transactions WHERE contractId = ? AND type = "send"';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json(results);
        }
    });
};

export const getReceiptsByContractId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM transactions WHERE contractId = ? AND type = "get"';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json(results);
        }
    });
};

export const getTransactionsByDateRange = (req, res) => {
    const { dateFrom, dateTo } = req.query;

    const query = `
        SELECT * FROM transactions
        WHERE date BETWEEN ? AND ?
    `;
    const values = [dateFrom, dateTo];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json(results);
        }
    });
};