"use client";
import { useEffect, useState } from "react";
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
import { questions as cryptoQuestions, fakeSocialData } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { init, useQuery, useGetBalanceOfToken } from "@airstack/airstack-react";
import { Question } from "@/components/ui/question";
import {
  useVotingContractAddAnswerToQuestion,
  useVotingContractGetQuestion,
  useVotingContractQuestions,
  useVotingContractTotalQuestions,
} from "@/src/generated";
import { useAccount, useConnect, useEnsName, useWalletClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

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

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export default function Home() {
  const [view, setView] = useState("profiles");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { address, isConnected } = useAccount();
  const wallet = useWalletClient();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { data: data1 } = useVotingContractGetQuestion({
    address: contractAddress,
    args: [0n],
  });

  const { data: data2 } = useVotingContractGetQuestion({
    address: contractAddress,
    args: [1n],
  });

  const { data: data3 } = useVotingContractGetQuestion({
    address: contractAddress,
    args: [2n],
  });

  const { data: data4 } = useVotingContractGetQuestion({
    address: contractAddress,
    args: [3n],
  });

  const { data: data5 } = useVotingContractGetQuestion({
    address: contractAddress,
    args: [4n],
  });

  useEffect(() => {
    if (data1 && data2 && data3 && data4 && data5) {
      setQuestions([data1, data2, data3, data4, data5]);
    }
  }, [data1, data2, data3, data4, data5]);

  const { data: socialData, error } = useQuery(
    query,
    { address: wallet.data?.account.address },
    { cache: false }
  );

  useEffect(() => {
    if (!questions || !questions.length) return;
    const formattedAnswers = [];
    const addressAndSocialData = (socialData || fakeSocialData).data
      ?.SocialFollowings?.Following;
    const firstFour = addressAndSocialData.slice(0, 4);
    const addressToSocial = firstFour.map((ff) => {
      const socialHandle = ff.followingAddress.socials.find(
        (s) => s.dappName === "farcaster" || s.dappName === "lens"
      );
      return {
        address: ff.followingAddress.addresses[0],
        social: socialHandle.profileName,
      };
    });
    console.log({ firstFour, addressToSocial });
    setAnswers(addressToSocial);
  }, [questions]);

  console.log({ questions });
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
          answers={answers.map((a) => a.social)}
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
