// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// เส้นทางสำหรับเพิ่มอุปกรณ์ใหม่
router.get('/:ownerId', deviceController.getDevicesByOwner);
router.post('/add', deviceController.addDevice);
router.delete('/:deviceId', deviceController.deleteDevice);

// เส้นทางสำหรับเพิ่มข้อมูลใหม่ลงในอุปกรณ์
router.put('/data/:deviceId', deviceController.updateDeviceData);


module.exports = router;