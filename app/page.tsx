"use client";
import { useState } from "react";
import {
  useExploreProfiles,
  useExplorePublications,
  PublicationTypes,
  PublicationSortCriteria,
  PublicationMainFocus,
  useReaction,
  useActiveProfile,
  ReactionTypes,
  usePublications,
  profileId,
  usePublication,
  publicationId,
  useComments,
} from "@lens-protocol/react-web";
import {
  Loader2,
  ListMusic,
  Newspaper,
  PersonStanding,
  Shapes,
  Share,
  Globe,
  MessageSquare,
  Repeat2,
  Heart,
  Grab,
  ArrowRight,
} from "lucide-react";
import { questions as cryptoQuestions } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { Question } from "@/components/ui/question";

export default function Home() {
  const [view, setView] = useState("profiles");
  const [questions, setQuestions] = useState(cryptoQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    data: publication,
    loading,
    hasMore,
    next,
  } = usePublications({
    profileId: profileId("0x017f"),
    limit: 10,
  });
  const publication2 = usePublication({
    publicationId: publicationId("0x017f-0x02"),
  });

  console.log({ publication, publication2 });

  let { data: profiles, loading: loadingProfiles } = useExploreProfiles({
    limit: 50,
  }) as any;

  const { data: profile } = useActiveProfile();

  // let { data: musicPubs, loading: loadingMusicPubs } = useExplorePublications({
  //   limit: 25,
  //   sortCriteria: PublicationSortCriteria.CuratedProfiles,
  //   publicationTypes: [PublicationTypes.Post],
  //   metadataFilter: {
  //     restrictPublicationMainFocusTo: [PublicationMainFocus.Audio],
  //   },
  // }) as any;

  // let { data: publications, loading: loadingPubs } = useExplorePublications({
  //   limit: 25,
  //   sortCriteria: PublicationSortCriteria.CuratedProfiles,
  //   publicationTypes: [PublicationTypes.Post],
  //   metadataFilter: {
  //     restrictPublicationMainFocusTo: [PublicationMainFocus.Image],
  //   },
  // }) as any;

  // profiles = profiles?.filter((p) => p.picture?.original?.url);

  // publications = publications?.filter((p) => {
  //   if (p.metadata && p.metadata.media[0]) {
  //     if (p.metadata.media[0].original.mimeType.includes("image")) return true;
  //     return false;
  //   }
  //   return true;
  // });

  // function openPublication(publication) {
  //   window.open(`https://share.lens.xyz/p/${publication.id}`, "_blank");
  // }

  return (
    <main
      className="
      w-full
    "
    >
      <div
        className=" px-6 py-14
      sm:px-10"
      >
        <Question
          questionPrompt={questions[currentQuestion]}
          answers={["a1", "a2", "a3", "a4"]}
        />
      </div>

      <div className="absolute bottom-0 flex w-full justify-between">
        <button
          className="pl-5 pb-3"
          onClick={() =>
            currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : 0
          }
        >
          Prev
        </button>
        <button
          className="pr-5 pb-3"
          onClick={() =>
            currentQuestion < questions.length - 1
              ? setCurrentQuestion(currentQuestion + 1)
              : questions.length - 1
          }
        >
          Next
        </button>
      </div>
    </main>
  );
}

function Reactions({ publication, profile }) {
  const { addReaction, removeReaction, hasReaction, isPending } = useReaction({
    profileId: profile.id,
  });

  const reactionType = ReactionTypes.Upvote;
  const hasReactionType = hasReaction({
    reactionType,
    publication,
  });

  async function likePublication() {
    if (!profile) return;
    if (hasReactionType) {
      await removeReaction({
        reactionType,
        publication,
      });
    } else {
      await addReaction({
        reactionType,
        publication,
      });
    }
  }
  return (
    <div>
      <Button className="rounded-full mr-1" variant="secondary">
        <MessageSquare className="mr-2 h-4 w-4" />
        {publication.stats.totalAmountOfComments}
      </Button>
      <Button className="rounded-full mr-1" variant="secondary">
        <Repeat2 className="mr-2 h-4 w-4" />
        {publication.stats.totalAmountOfMirrors}
      </Button>
      <Button
        onClick={likePublication}
        className="rounded-full mr-1"
        variant="secondary"
      >
        <Heart className="mr-2 h-4 w-4" />
        {publication.stats.totalUpvotes}
      </Button>
      <Button className="rounded-full mr-1" variant="secondary">
        <Grab className="mr-2 h-4 w-4" />
        {publication.stats.totalAmountOfCollects}
      </Button>
    </div>
  );
}
