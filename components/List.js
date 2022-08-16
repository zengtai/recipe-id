import ListItem from "./ListItem";

export default function List({ items, SLOT_ID, tag }) {
  return items.map((item, index) => {
    if (index == 0 || index == 2) {
      return (
        <ListItem
          key={`${item.id}${index}`}
          item={item}
          SLOT_ID={SLOT_ID}
          tag={tag}
          index={index}
        />
      );
    }
    return <ListItem key={`${item.id}${index}`} item={item} />;
  });
}
