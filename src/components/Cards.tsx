import React from "react";


interface CartProps {
    id: number;
    icon: string;
    isFlipped: boolean;
    onclick: (id: number) => void;
}

const url = "./src/assets/icon/dev.svg"

const Card: React.FC<CartProps> = ({id, icon, isFlipped, onclick }) => {
    return (
        <div className={`w-20 h-28 transition ease-in-out hover:-translate-y-2 duration-700 flex items-center justify-center border-2 rounded-lg cursor-pointer ${
            isFlipped ? "bg-gray-200 text-white" : "bg-black"
          }`}
          onClick={() => onclick(id)}
        >
            {isFlipped ? (
                <img src={icon} alt="card-icon" className="w-12 h-12"></img>
            ) : (
                <img src={url} alt="url-icon"></img>
            )}
        </div>
    )
}

export default Card