import NoteInput from "./NoteInput";

const ActiveAdmission = () => {

  

  return (
    <div className="w-full p-4 mt-6 rounded-xl border-[3px] border-red-400 bg-mutd  ">
      <div className="max-w-3xl">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-2 ">
          <p className="flex"><span className="text-primary font-medium mr-2">Admission date: </span>12/2/2024 18:30pm</p>
          <p className="flex"><span className="text-primary font-medium mr-2">Expected discharge: </span>in two weeks</p>
          <p className="flex"><span className="text-primary font-medium mr-2">Dedicated Doctor: </span>Jack maxwell</p>
          <p className="flex"><span className="text-primary font-medium mr-2">Department/Room:</span>ICU - 12/4</p>
        </div>
      </div>
      <div className="h-[1px] bg-green-800 my-4"></div>

      <div className="mt-6 lg:grid grid-cols-5 gap-4 max-w-4xl">

        <div className="mb-4 lg:mb-0 col-span-3 p-4 space-y-3 max-h-96 overflow-auto bg-primary/5  rounded-xl scrollbar-hide">
          {
            [...Array(3).keys()].map((_, idx) => (

              <div key={idx} className="p-2 bg-primary/15 rounded-lg">
                <p className="text-sm text-muted-foreground">12/2/2024 14:34</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, nostrum.</p>
              </div>
            ))
          }
        </div>

        <div className="col-span-2">
          <NoteInput/>
        </div>

      </div>
    </div>
  );
}

export default ActiveAdmission;