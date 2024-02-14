import { useQuery } from "react-query";
import { OwnerSingletonResponse } from "../../../../../types/owner";
import { getAdopts, getFavoriteCharacters } from "../../../../../api/adopts";

type FavoriteSectionProps = {
  owner?: OwnerSingletonResponse;
};

export const FavoriteSection = (props: FavoriteSectionProps) => {
  const { owner } = props;

  const { data: ownerAdopts, isLoading } = useQuery({
    queryKey: ["ownerCharacters", owner?.ownerSingletonInfo.id],
    queryFn: () => {
      return getAdopts({
        ownerId: owner?.ownerSingletonInfo.id,
        sort: "code:ASC",
      });
    },
    enabled: !!owner,
  });

  const { data: favoriteCharacters, isLoading: isLoadingFavoriteCharacters } =
    useQuery({
      queryKey: [
        "favoriteCharacters",
        owner?.ownerSingletonInfo.favoriteCharacters,
      ],
      queryFn: () => {
        return getFavoriteCharacters(owner?.ownerSingletonInfo.id || "");
      },
      enabled: !!owner,
    });

  return (
    <div>
      <div>Favorites</div>
      {favoriteCharacters?.data.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}

      <div>Characters</div>
      {ownerAdopts?.data.map((adopt) => (
        <div key={adopt.id}>{adopt.code}</div>
      ))}
    </div>
  );
};
