import { useAction } from "../../../store";

export const EnterButton = () => {
  const { setStartRoll } = useAction(["setStartRoll"]);

  const handleClick = () => {
    setStartRoll(true);
    console.log("Starting dice roll animation");
  };

  return (
    <div className="absolute bottom-36 left-1/2 inline-block -translate-x-1/2 cursor-pointer bg-transparent text-[16px] text-white">
      <button onClick={handleClick} className="btn-neon font-protest">
        <span>Roll the Dice!</span>
      </button>
    </div>
  );
};
