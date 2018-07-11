import { HttpError } from 'errors/HttpError';
import { session } from 'libraries/session';
import { validation } from 'libraries/validation';
import { InventoryItem } from 'models';


class InventoryController
{
    async removeItem(request, response)
    {
        const user = await session.getUser(request);

        validation.run(request.body, {
            id: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }]
        });

        const { id } = request.body;
        const inventoryItem = await user.inventoryItems().where('id', '=', id).first();

        if (!inventoryItem) {
            throw new HttpError('Unable to remove inventory item.');
        }

        await inventoryItem.delete();

        response.json({
            id: inventoryItem.id
        });
    }

    async saveItem(request, response)
    {
        const user = await session.getUser(request);

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
            inventoryItem = await user.inventoryItems().where('id', '=', id).first();
        }
        else {
            inventoryItem = new InventoryItem();
        }

        inventoryItem.certificationId = certificationId;
        inventoryItem.colorId = colorId;
        inventoryItem. crateId = crateId;
        inventoryItem.itemId = itemId;
        inventoryItem.rarityId = rarityId;
        inventoryItem.quantity = quantity;
        inventoryItem.tradeable = tradeable;
        inventoryItem.userId = user.id;
        await inventoryItem.save();

        response.json({
            inventoryItem: inventoryItem
        });
    }
}

export default InventoryController;
