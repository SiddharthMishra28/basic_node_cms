import menuService from '../services/menuService.js';

export const getAllMenus = async (req, res) => {
    try {
        const menus = await menuService.getAllMenus();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving menus', error: err.message });
    }
};

export const createMenu = async (req, res) => {
    const { menu_name, menu_position, theme_id } = req.body;
    try {
        await menuService.createMenu(menu_name, menu_position, theme_id);
        res.status(201).json({ message: 'Menu created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating menu', error: err.message });
    }
};

export const updateMenu = async (req, res) => {
    const { id } = req.params;
    const { menu_name, menu_position, theme_id } = req.body;
    try {
        await menuService.updateMenu(id, menu_name, menu_position, theme_id);
        res.json({ message: 'Menu updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating menu', error: err.message });
    }
};

export const deleteMenu = async (req, res) => {
    const { id } = req.params;
    try {
        await menuService.deleteMenu(id);
        res.json({ message: 'Menu deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting menu', error: err.message });
    }
};

export const getMenuItems = async (req, res) => {
    const { menuId } = req.params;
    try {
        const items = await menuService.getMenuItems(menuId);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving menu items', error: err.message });
    }
};

export const addMenuItem = async (req, res) => {
    const { menuId } = req.params;
    const { label, url, parent_id, position } = req.body;
    try {
        await menuService.addItemToMenu(menuId, label, url, parent_id, position);
        res.status(201).json({ message: 'Menu item added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding menu item', error: err.message });
    }
};

export const updateMenuItem = async (req, res) => {
    const { menuId, itemId } = req.params;
    const { label, url, parent_id, position } = req.body;
    try {
        await menuService.updateMenuItem(menuId, itemId, label, url, parent_id, position);
        res.json({ message: 'Menu item updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating menu item', error: err.message });
    }
};

export const deleteMenuItem = async (req, res) => {
    const { menuId, itemId } = req.params;
    try {
        await menuService.deleteMenuItem(menuId, itemId);
        res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting menu item', error: err.message });
    }
};

export default {
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
}