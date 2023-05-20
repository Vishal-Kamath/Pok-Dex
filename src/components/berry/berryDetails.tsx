import { getBerryData } from '@/utils/api';
import { cn } from '@/utils/lib';
import { FC } from 'react';

type Props = Awaited<ReturnType<typeof getBerryData>>;

const StatsBadge: FC<{ className: string; name: string; value: string }> = ({
  className,
  name,
  value,
}) => (
  <div
    className={cn(
      className,
      'flex gap-1 rounded-md px-3 py-1 text-xs text-black'
    )}
  >
    <span>{name}</span>
    <span>/</span>
    <span>{value}</span>
  </div>
);

const BerryDetails: React.FC<Props> = ({ berryItem, berryDetails }) => {
  return (
    <div className="w-full">
      {/* Title bar*/}
      <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
        <i className="text-slate-500">#{berryDetails.id}</i>
        <span>{berryDetails.item.name}</span>
        <div className="rounded-md bg-violet-300 px-3 py-2 text-xs text-black">
          {berryItem.category.name}
        </div>
      </div>

      {/* entries */}
      <div className="text-gray-500">
        {berryItem.effect_entries.map((entry) => (
          <div key={entry.effect}>{entry.effect}</div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-2">
        <span>Stats</span>
        <div className="flex flex-wrap gap-2">
          <StatsBadge
            className="bg-blue-200"
            name="size"
            value={`${berryDetails.size / 10}cm`}
          />
          <StatsBadge
            className="bg-yellow-300"
            name="cost"
            value={`${berryItem.cost}`}
          />
          <StatsBadge
            className="bg-rose-200"
            name="firmness"
            value={berryDetails.firmness.name}
          />
          <StatsBadge
            className="bg-violet-200"
            name="growth time"
            value={`${berryDetails.growth_time}`}
          />
          <StatsBadge
            className="bg-amber-200"
            name="max harvest"
            value={`${berryDetails.max_harvest}`}
          />
          {berryItem.attributes.map((attr) => (
            <StatsBadge
              className="bg-teal-300"
              key={attr.url}
              name="attribute"
              value={attr.name}
            />
          ))}
        </div>
      </div>
      <h2 className="my-3 text-2xl">Flavors</h2>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr>
            <td className="border-2 border-sky-700 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
              flavor
            </td>
            <td className="border-2 border-sky-700 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
              potency
            </td>
          </tr>
        </thead>
        <tbody>
          {berryDetails.flavors.map((flavor) => (
            <tr key={flavor.flavor.name}>
              <td className="border-2 border-slate-400 dark:border-slate-700">
                {flavor.flavor.name}
              </td>
              <td className="border-2 border-slate-400 dark:border-slate-700">
                {flavor.potency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BerryDetails;
