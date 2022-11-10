package hackerrank;

import java.util.HashMap;

public class FurnitureOrder implements FurnitureOrderInterface {
    /**
     * orderedFurniture maps Furniture type to ordered quantities
     * 
     * Kept as private so that it cannot be mutated outside functions
     */
    private final HashMap<Furniture, Integer> orderedFurniture;

    /**
     * Initialize a new mapping of Furniture types to order quantities.
     */
    FurnitureOrder() {
        orderedFurniture = new HashMap<Furniture, Integer>();
    }

    public void addToOrder(final Furniture type, final int furnitureCount) {
        if (orderedFurniture.containsKey(type)) {
            orderedFurniture.put(type, orderedFurniture.get(type) + furnitureCount);
        } else {
            orderedFurniture.put(type, furnitureCount);
        }
    }

    public HashMap<Furniture, Integer> getOrderedFurniture() {
        // return deep copy of map to prevent unwanted mutation of original map
        HashMap<Furniture, Integer> temp = new HashMap<Furniture, Integer>();
        for (java.util.Map.Entry<Furniture, Integer> e : orderedFurniture.entrySet()) {
            temp.put(e.getKey(), e.getValue());
        }

        return temp;
    }

    public float getTotalOrderCost() {
        // Return total order cost
        // Sums multiple of order quantity and cost of furniture
        float amount = 0;
        for (java.util.Map.Entry<Furniture, Integer> e : orderedFurniture.entrySet()) {
            amount += e.getKey().cost() * e.getValue();
        }
        return amount;
    }

    public int getTypeCount(Furniture type) {
        // Returns the amount of Furniture type ordered
        // If the Furniture type has not been ordered, 0 is returned
        if (orderedFurniture.containsKey(type)) {
            return orderedFurniture.get(type);
        } else {
            return 0;
        }
    }

    public float getTypeCost(Furniture type) {
        // Returns the order cost of the Furniture type
        // If the Furniture type has not been ordered, 0 is returned
        if (orderedFurniture.containsKey(type)) {
            return orderedFurniture.get(type) * type.cost();
        } else {
            return 0;
        }
    }

    public int getTotalOrderQuantity() {
        // Returns the total quantity of 
        int quantity = 0;
        for (java.util.Map.Entry<Furniture, Integer> e : orderedFurniture.entrySet()) {
            quantity += e.getValue();
        }
        return quantity;
    }
}