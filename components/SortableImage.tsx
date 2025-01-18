import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

const SortableImage = ({ id, image, onRemove }: { id: number; image: string; onRemove: () => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        objectFit: "cover",
        margin: "5px",
        width: "100px",
        height: "100px",
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} className="relative">
            <img
                src={image}
                alt="Imagen"
                style={style}
                className="rounded-md border w-full h-full"
            />
            <button
                type="button"
                onClick={onRemove}
                className="absolute z-10 top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                style={{
                    transform: CSS.Transform.toString(transform), // Aplica el mismo transform al botón
                    width: '20px', // Establece el tamaño fijo para el botón
                    height: '20px',
                }}
            >
                <Image
                    src={"/trash.svg"}
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                />
            </button>
        </div>
    );
};

export default SortableImage;
