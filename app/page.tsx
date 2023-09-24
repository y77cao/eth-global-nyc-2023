"use client";
import { useState } from "react";
import {
  useExploreProfiles,
  useReaction,
  useActiveProfile,
  ReactionTypes,
  usePublications,
  profileId,
  usePublication,
  publicationId,
  useComments,
} from "@lens-protocol/react-web";
import { MessageSquare, Repeat2, Heart, Grab, ArrowRight } from "lucide-react";
import { questions as cryptoQuestions } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { init, useQuery, useGetBalanceOfToken } from "@airstack/airstack-react";
import { Question } from "@/components/ui/question";

init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY as string);

const query = `query MyQuery($address: Identity!) {
  SocialFollowings(
    input: {filter: {identity: {_eq: $address}}, blockchain: ALL}
  ) {
    Following {
      followingAddress {
        addresses
        socials {
          dappName
          profileName
        }
      }
    }
  }
}`;
import {
  useVotingContractQuestions,
  useVotingContractTotalQuestions,
} from "@/src/generated";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  const [view, setView] = useState("profiles");
  const [questions, setQuestions] = useState([]);

  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { data: data1 } = useVotingContractQuestions({
    address: "0xd17ad043395cFE036d297580a63F83dA8B4a1d0f",
    args: [1n],
  });

  const { data: data2 } = useVotingContractQuestions({
    address: "0xd17ad043395cFE036d297580a63F83dA8B4a1d0f",
    args: [2n],
  });

  const { data: data3 } = useVotingContractQuestions({
    address: "0xd17ad043395cFE036d297580a63F83dA8B4a1d0f",
    args: [3n],
  });

  const { data: data4 } = useVotingContractQuestions({
    address: "0xd17ad043395cFE036d297580a63F83dA8B4a1d0f",
    args: [4n],
  });

  const { data: data5 } = useVotingContractQuestions({
    address: "0xd17ad043395cFE036d297580a63F83dA8B4a1d0f",
    args: [5n],
  });

  setQuestions([data1?.[0], data2?.[0], data3?.[0], data4?.[0], data5?.[0]]);

  const { data, error } = useQuery(
    query,
    { address: "0x439945b21b40b1cA89c135892fa1E3896Ff39Ff0" },
    { cache: false }
  );

  let { data: profiles, loading: loadingProfiles } = useExploreProfiles({
    limit: 50,
  }) as any;

  const { data: profile } = useActiveProfile();

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
