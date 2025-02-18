import express from 'express';
import multer from 'multer';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import {
    allContracts,
    addContract,
    getContractById,
    nameContracts,
    updateContractById,
    getContractsByDateRange
} from './controllers/ContractController.js';
import {
    addTransaction,
    allTransactions,
    getTransactionById,
    getTransactionsByDateRange,
    getExpensesByContractId,
    getReceiptsByContractId, deleteTransactionById, updateTransactionById
} from "./controllers/TransactionsController.js";
import path from "path";
import {deleteFile, downloadFile, uploadFile} from "./controllers/FilesController.js";
import {fileURLToPath} from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueId = uuidv4();
        const decodedFileName = decodeURIComponent(file.originalname);
        const finalFileName = `${uniqueId}-${decodedFileName}`;
        file.finalFileName = finalFileName; // Store the final file name in the file object
        cb(null, finalFileName);
    }
});

const upload = multer({ storage: storage }).array('file', 10); // Accept up to 10 files

export const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'contracts_db'
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к MySQL:', err);
        process.exit(1);
    }
    console.log('Успешное подключение к MySQL');
});

app.get('/contracts', allContracts);
app.get('/contracts/names', nameContracts);
app.post('/contracts', addContract);
app.get('/contracts/date-range', getContractsByDateRange);
app.get('/contracts/:id', getContractById);
app.put('/contracts/:id', updateContractById);
app.get('/contracts/:id/expenses', getExpensesByContractId);
app.get('/contracts/:id/receipts', getReceiptsByContractId);

app.get('/transactions', allTransactions);
app.get('/transactions/date-range', getTransactionsByDateRange);
app.get('/transactions/:id', getTransactionById);
app.delete('/transactions/:id', deleteTransactionById);
app.put('/transactions/:id', updateTransactionById);
app.post('/transactions', addTransaction);

app.post('/upload', upload, uploadFile);
app.get('/download/:contractId', downloadFile);
app.delete('/delete', deleteFile);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});