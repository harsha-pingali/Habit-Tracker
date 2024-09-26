interface Habbit{
    id:String,
    name:String,
    frequency:"daily" | "weekly",
    completedDates:String[],
    createdAt:String
}

export default Habbit