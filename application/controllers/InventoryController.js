const validator = require('validator');
const HttpError = require('errors/HttpError');
const session = require('libraries/session');
const validation = require('libraries/validation');
const InventoryItem = require('models/InventoryItem');


class InventoryController {

    async removeItem(request, response) {
        const { userId } = session.validateToken(request);

        validation.run(request.body, {
            id: [{
                rule: validator.isInt,
                options: {min: 1}
            }]
        });

        const { id } = request.body;

        const inventoryItem = InventoryItem.findOne({
            where: {
                id: id,
                userId: userId
            }
        });

        if (!inventoryItem) {
            throw new HttpError('Unable to remove inventory item.');
        }

        inventoryItem.destroy();

        response.json({
            id: inventoryItem.id
        });
    }

    async saveItem(request, response) {
        const { userId } = session.validateToken(request);

        validation.run(request.body, {
            certificationId: [{rule: validator.isInt}],
            colorId: [{rule: validator.isInt}],
            crateId: [{rule: validator.isInt}],
            id: [{rule: validator.isInt}],
            itemId: [{
                rule: validator.isInt,
                options: {min: 1}
            }],
            quantity: [{
                rule: validator.isInt,
                options: {min: 1}
            }],
            rarityId: [{rule: validator.isInt}],
            tradeable: [{rule: validator.isBoolean}],
        });

        const { certificationId, colorId, crateId, id, itemId, quantity, rarityId, tradeable } = request.body;

        let inventoryItem;

        if (id) {
            inventoryItem = await InventoryItem.findOne({
                where: {
                    id: id,
                    userId: userId
                }
            });
        }
        else {
            inventoryItem = InventoryItem.build({});
        }

        inventoryItem.certificationId = certificationId;
        inventoryItem.colorId = colorId;
        inventoryItem. crateId = crateId;
        inventoryItem.itemId = itemId;
        inventoryItem.rarityId = rarityId;
        inventoryItem.quantity = quantity;
        inventoryItem.tradeable = tradeable;
        inventoryItem.userId = userId;
        inventoryItem = await inventoryItem.save();

        response.json({
            inventoryItem: inventoryItem
        });
    }
}

module.exports = InventoryController;
