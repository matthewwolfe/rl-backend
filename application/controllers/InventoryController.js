const HttpError = require('errors/HttpError');
const session = require('libraries/session');
const validation = require('libraries/validation');
const InventoryItem = require('models/InventoryItem');


class InventoryController {

    async removeItem(request, response) {
        const { userId } = session.validateToken(request);

        validation.run(request.body, {
            id: [{
                rule: validation.rules.isInt,
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
            certificationId: [{rule: validation.rules.isInt}],
            colorId: [{rule: validation.rules.isInt}],
            crateId: [{rule: validation.rules.isInt}],
            id: [{rule: validation.rules.isInt}],
            itemId: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }],
            quantity: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }],
            rarityId: [{rule: validation.rules.isInt}],
            tradeable: [{rule: validation.rules.isBoolean}],
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
