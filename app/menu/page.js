async function getMenuItems() {
  const res = await fetch("https://strapi.aleksa-marinkovic.me/api/foods?sort[0]=name&sort[1]=description&pagination[page]=1&pagination[pageSize]=200", { cache: "no-cache" });
  const data = await res.json();
  return data.data;
}

export default async function MenuPage() {
  const menuItems = await getMenuItems();
  return (
    <div>
      <h1>Menu items</h1>
      {menuItems?.map((menuItem) => {
        return <div key={menuItem.id}>{menuItem.id + "  " +  menuItem.attributes.name + "  " + menuItem.attributes.price + "rsd  " + menuItem.attributes.description}</div>
      })}
    </div>
  );
}
