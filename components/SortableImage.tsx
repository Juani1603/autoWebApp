import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImage = ({ id, image }: { id: number; image: string; onRemove: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        objectFit: "cover",
        margin: "5px",
        width: "150px",
        height: "150px",
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners}>
            <img
                src={image}
                alt="Imagen"
                style={style}
                className="rounded-md border w-full h-full"
            />
        </div>
    );
};

export default SortableImage;
