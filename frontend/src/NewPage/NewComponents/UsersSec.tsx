export default function UsersSec(){
        const users = [
        {
            id:1,
            name:"deep"
        },
        {
            id:2,
            name:"seep"
        },
        {
            id:3,
            name:"reep"
        },
        {
            id:4,
            name:"jeep"
        }
        ,{
            id:5,
            name:"beep"
        }
    ]


    return(
        <div>
            {users.map((u)=>(
                        <div key={u.id}>
                            <p>{u.name}</p>
                        </div>
                    ))}
        </div>
    )
}