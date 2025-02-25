import { db } from "../server.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = (req, res) => {
    const contractId = req.body.contractId;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'Файлы не загружены' });
    }

    const query = 'INSERT INTO contract_files (contract_id, file_path) VALUES ?';
    const values = files.map(file => [contractId, file.finalFileName]);

    db.query(query, [values], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.status(201).json({ message: 'Файлы успешно загружены' });
        }
    });
}

export const downloadFile = (req, res) => {
    const contractId = req.params.contractId;

    const query = 'SELECT file_path FROM contract_files WHERE contract_id = ?';
    db.query(query, [contractId], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Файлы не найдены' });
        } else {
            const files = results.map(row => row.file_path);
            res.json({ files: files });
        }
    });
}

export const deleteFile = (req, res) => {
    const { fileName, contractId } = req.body;
    const filePath = path.join(__dirname, '../uploads', fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Ошибка при удалении файла:', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }

        const query = 'DELETE FROM contract_files WHERE contract_id = ? AND file_path = ?';
        db.query(query, [contractId, fileName], (err, results) => {
            if (err) {
                console.error('Ошибка выполнения запроса:', err);
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            res.json({ message: 'Файл успешно удален' });
        });
    });
};