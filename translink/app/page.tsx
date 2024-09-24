import Image from "next/image";
import DateRangeSelector from "@/components/daterange";
import BarChart from "@/components/barchart"; 
import FuelConsMathChart from "@/components/fuelconsmathchart";
import FuelLevelParamsChart from "@/components/fuellevelparamschart";
import FuelConsImpulseChart from "@/components/fuelconsimpulsechart";
import VehicleDashboard from "@/components/viewcarinfo";
export default function Home() {
  return (
    <div className="">
      <DateRangeSelector />
      <div className="max-w-screen-sm flex flex-col gap-16 p-10 md:max-w-screen-lg">
        
          <div className="flex gap-16  ">
            <BarChart />
            <FuelConsMathChart/>
          </div>
          <div className="flex gap-16 ">
            <FuelLevelParamsChart />
            <FuelConsImpulseChart/>
          </div>
      </div>
      
      
    </div>
  );
}
