const types = [70, 71, 3, 4098, 4099, 8194, 16386];

const names = [
    "avant droite",
    "arrière gauche",
    "arrière droite",
];

const names2 = [
    "avant droit",
    "arrière gauche",
    "arrière droite",
];

HelpText = function(msg)
{
    if (!IsHelpMessageOnScreen())
    {
        SetTextComponentFormat('STRING')
        AddTextComponentString(msg)
        DisplayHelpTextFromStringLabel(0, 0, 1, -1)
    }
}

setTick(() => {
    let ped = PlayerPedId();
    let pco = GetEntityCoords(ped);

    for (let tr = 0; tr < types.length; tr++)
    {
        let veh = GetClosestVehicle(pco[0], pco[1], pco[2], 5.0, 0, types[tr]);

        if (DoesEntityExist(veh))
        {
            for (let i = 1; i < GetNumberOfVehicleDoors(veh); i++)
            {
                let coord = GetEntryPositionOfDoor(veh, i);

                if (Vdist2(pco[0], pco[1], pco[2], coord[0], coord[1], coord[2]) < 1.0 && !DoesEntityExist(GetPedInVehicleSeat(veh, i)) && GetVehicleDoorLockStatus(veh) !== 2 && !IsPedInAnyVehicle(ped))
                {
                    if (names[i - 1] && !IsThisModelABike(GetEntityModel(veh)) && !IsThisModelABoat(GetEntityModel(veh)))
                        HelpText("Appuyez sur ~INPUT_CONTEXT~ pour rentrer par la porte " + names[i - 1]);
                    else if (names2[i - 1] && IsThisModelABike(GetEntityModel(veh)) && IsThisModelABoat(GetEntityModel(veh)))
                        HelpText("Appuyez sur ~INPUT_CONTEXT~ pour rentrer sur le siège " + names2[i - 1]);
                    else
                        HelpText("Appuyez sur ~INPUT_CONTEXT~ pour rentrer par cette porte");

                    if (IsControlJustPressed(1, 38))
                    {
                        TaskEnterVehicle(ped, veh, 10000, i - 1, 1.0, 1, 0);
                    }
                }
            }
        }
    }
});
