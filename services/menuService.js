const Menu = require('../models/menuModel');

const menuService = {
  getAllMenus: async () => {
    const [rows] = await Menu.getAll();
    return rows;
  },

  createMenu: async (menu_name, menu_position, theme_id) => {
    await Menu.create(menu_name, menu_position, theme_id);
  },

  updateMenu: async (id, menu_name, menu_position, theme_id) => {
    await Menu.update(id, menu_name, menu_position, theme_id);
  },

  deleteMenu: async (id) => {
    await Menu.delete(id);
  },

  getMenuItems: async (menuId) => {
    const [rows] = await Menu.getMenuItems(menuId);
    return rows;
  },

  addItemToMenu: async (menuId, label, url, parent_id, position) => {
    await Menu.addItem(menuId, label, url, parent_id, position);
  },

  updateMenuItem: async (menuId, itemId, label, url, parent_id, position) => {
    await Menu.updateItem(menuId, itemId, label, url, parent_id, position);
  },

  deleteMenuItem: async (menuId, itemId) => {
    await Menu.deleteItem(menuId, itemId);
  }
};

module.exports = menuService;
