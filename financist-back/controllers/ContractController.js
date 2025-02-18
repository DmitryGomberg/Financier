import { db } from '../server.js';

export const allContracts = (req, res) => {
    const query = 'SELECT * FROM contracts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json(results);
        }
    });
}

export const nameContracts = (req, res) => {
    const query = 'SELECT id, name FROM contracts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json(results);
        }
    });
}

export const updateContractById = (req, res) => {
    const { id } = req.params;
    let { name, number, customerName,executorName, price, dateOfCreate, deadline, deadlineType, payCondition, dateOfWrite, dateOfClose } = req.body;

    let query = 'UPDATE contracts SET name = ?, number = ?, customerName = ?, executorName = ?, price = ?, dateOfCreate = ?, deadline = ?, deadlineType = ?, payCondition = ?';
    const values = [name, number, customerName, executorName, price, dateOfCreate, deadline, deadlineType, JSON.stringify(payCondition)];

    if (dateOfWrite !== undefined) {
        if (dateOfWrite === '') {
            query += ', dateOfWrite = NULL';
        } else {
            query += ', dateOfWrite = ?';
            values.push(dateOfWrite);
        }
    }

    if (dateOfClose !== undefined) {
        if (dateOfClose === '') {
            query += ', dateOfClose = NULL';
        } else {
            query += ', dateOfClose = ?';
            values.push(dateOfClose);
        }
    }

    query += ' WHERE id = ?';
    values.push(id);

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Контракт не найден' });
        } else {
            res.json({ message: 'Контракт обновлен' });
        }
    });
};

export const getContractById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM contracts WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Контракт2 не найден' });
        } else {
            res.json(results[0]);
        }
    });
};

export const addContract = (req, res) => {
    const { name, number, customerName, executorName, price, dateOfCreate, dateOfWrite, dateOfClose, deadline, deadlineType, payCondition } = req.body;
    const query = 'INSERT INTO contracts (name, number, customerName, executorName, price, dateOfCreate, dateOfWrite, dateOfClose, deadline, deadlineType, payCondition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, number, customerName, executorName, price, dateOfCreate, dateOfWrite, dateOfClose, deadline, deadlineType, JSON.stringify(payCondition)];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.status(201).json({ message: 'Контракт добавлен', contractId: results.insertId });
        }
    });
}

export const getContractsByDateRange = (req, res) => {
    console.log(req)
    const { dateFrom, dateTo } = req.query;

    const query = `
        SELECT * FROM contracts
        WHERE (dateOfCreate BETWEEN ? AND ?)
        OR (dateOfWrite BETWEEN ? AND ?)
        OR (dateOfClose BETWEEN ? AND ?)
    `;
    const values = [dateFrom, dateTo, dateFrom, dateTo, dateFrom, dateTo];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json(results);
        }
    });
};