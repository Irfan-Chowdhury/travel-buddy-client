import { getTopTravelers } from "@/lib/api";
import { Card } from "../ui/Card";
import { Rating } from "../ui/Rating";
import { Chip } from "../ui/Chip";
import { Button } from "../ui/Button";
import Link from "next/link";

export async function TopTravelers() {
  const response = await getTopTravelers();
  const travelers = response.data;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Travelers
          </h2>
          <p className="text-lg text-gray-600">
            Meet experienced travelers ready for new adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {travelers.map((traveler: any) => (
            <Card key={traveler.id} hover>
              <div className="p-6">

                {/* Avatar */}
                <img
                  src={traveler.avatar_url}
                  alt={traveler.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />

                {/* Name */}
                <h3 className="text-lg font-bold text-center mb-1 text-gray-900">
                  {traveler.name}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-600 text-center mb-3">
                  {traveler.location}
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  <Rating
                    rating={traveler.rating_avg}
                    count={traveler.rating_count}
                    size="sm"
                  />
                </div>

                {/* Interests */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {traveler.interests?.slice(0, 3).map((interest: any) => (
                    <Chip key={interest.id}>{interest.name}</Chip>
                  ))}
                </div>

                {/* Button */}
                <Link href={`/profile/${traveler.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </Link>

              </div>
            </Card>
          ))}

        </div>

      </div>
    </section>
  );
}
