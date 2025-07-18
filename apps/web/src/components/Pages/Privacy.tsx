import { Link } from "react-router";
import PageHeader from "@/components/Pages/PageHeader";
import PageLayout from "@/components/Shared/PageLayout";
import { H4 } from "@/components/Shared/UI";

const Privacy = () => {
  const updatedAt = "October 30, 2023";

  return (
    <PageLayout title="Privacy Policy">
      <PageHeader title="Privacy Policy" updatedAt={updatedAt} />
      <div className="relative">
        <div className="flex justify-center">
          <div className="relative mx-auto rounded-lg">
            <div className="!p-8 max-w-none text-gray-500 dark:text-gray-200">
              {/* 1. Overview begins */}
              <H4 className="mb-5">1. Overview</H4>
              <div className="space-y-5">
                <p className="leading-7">
                  By accessing the Site, you agree to not only this Privacy
                  Policy, but also to our Terms of Use and any other written
                  agreements for using the Site. And you agree to our collection
                  and use of any personal data (as described here) as well as
                  the features of public/permissionless blockchain technology.
                </p>
                <p className="leading-7">
                  This Privacy Policy (the “Privacy Policy”) provides a
                  comprehensive description of how Hey (“we,” “our,” or “us”)
                  collects, uses, and shares information about you in connection
                  with the website at "hey.xyz", as well as your rights and
                  choices regarding such information.
                </p>
                <p className="leading-7">
                  By accessing or using the Site, you accept and assume certain
                  inherent features related to engaging in recording the data on
                  the blockchain. Interactions with the Lens rely on smart
                  contracts stored on a publicly available blockchain,
                  cryptographic tokens generated by the smart contracts, and
                  other nascent software, applications and systems that interact
                  with blockchain-based networks. One of the defining features
                  of blockchain technology is that its entries are immutable,
                  which means, as a technical matter, they generally cannot be
                  deleted or modified by anyone. If you are not comfortable
                  assuming the inherently immutable and public nature of all
                  entries on the blockchain, you should not engage with our
                  Site.
                </p>
              </div>
              {/* 1. Overview ends */}
              {/* 2. Information Collection begins */}
              <H4 className="mt-8 mb-5">2. Information Collection</H4>
              <div className="space-y-5">
                <p className="leading-7">
                  We may collect the following information about you when you
                  use the Site:
                </p>
                <ul className="list-inside list-disc">
                  <li className="leading-7">
                    Information you provide such as feedback, questions, and
                    issue reports.
                  </li>
                </ul>
                <p className="leading-7">
                  You may choose to voluntarily provide other information to us
                  that we have not solicited from you, and, in such instances,
                  you are solely responsible for such information.
                </p>
                <p className="leading-7">
                  We may use tracking technologies to automatically collect
                  information including the following:
                </p>
                <ul className="list-inside list-disc space-y-3">
                  <li className="leading-7">
                    <b>Log Files</b>, to record events or errors that occur when
                    using our Site.
                  </li>
                  <li className="leading-7">
                    <b>Cookies</b>, small data stored on your device that are
                    necessary for you to browse the Site.
                  </li>
                  <li className="leading-7">
                    <b>Public Information</b>, data from activity that is
                    publicly visible and/or accessible on blockchains. This may
                    include blockchain addresses and information regarding the
                    NFTs in wallets.
                  </li>
                </ul>
              </div>
              {/* 2. Information Collection ends */}
              {/* 3. Use of Information begins */}
              <H4 className="mt-8 mb-5">3. Use of Information</H4>
              <p className="leading-7">
                We may need to use it to operate and manage the Services on this
                Site (or other places), provide you support, ensure we comply
                with laws and regulation, and enforce the security of the Site
                or make other improvements.
              </p>
              {/* 3. Use of Information ends */}
              {/* 4. Third-Parties begins */}
              <H4 className="mt-8 mb-5">4. Third-Parties</H4>
              <p className="leading-7">
                This Privacy Policy does not apply to websites, apps, products,
                or services that we do not own or control. For example, your
                interactions with EVM wallet are governed by the applicable
                privacy policies of that particular wallet.
              </p>
              {/* 4. Third-Parties ends */}
              {/* 5. Analytics begins */}
              <H4 className="mt-8 mb-5">5. Analytics</H4>
              <div className="space-y-5">
                <p className="leading-7">
                  We use <b>Simple Analytics</b> to collect various events from
                  user actions to analyse and make decisions for Site
                  improvements.
                </p>
                <p className="leading-7">
                  We collect account id to identify the user. This makes sure to
                  give the best experience to the user.
                </p>
                <p className="leading-7">
                  We may change to other third-party analytics service provider.
                  The Privacy Policy of Analytics subjects to the every
                  provider. You should review everything before using the Site.
                </p>
              </div>
              {/* 5. Analytics ends */}
              {/* 6. Your Rights and Choices begins */}
              <H4 className="mt-8 mb-5">6. Your Rights and Choices</H4>
              <div className="space-y-5">
                <p className="leading-7">
                  We may collect the following information about you when you
                  use the Site:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li className="leading-7">
                    <b>Cookies</b>. We will only use strictly necessary cookies.
                    These cookies are essential for you to browse the Site and
                    use its features, including accessing secure areas of the
                    Site.
                  </li>
                  <li className="linkify leading-7">
                    <b>Do Not Track</b>. Your browser settings may allow you to
                    automatically transmit a “Do Not Track” signal to the online
                    services you visit. Note, however, there is no industry
                    consensus as to what Site and app operators should do with
                    regard to these signals. Accordingly, unless and until the
                    law is interpreted to require us to do so, we do not monitor
                    or take action with respect to “Do Not Track” signals. For
                    more information on “Do Not Track,” visit{" "}
                    <Link
                      rel="noreferrer"
                      target="_blank"
                      to="https://allaboutdnt.com"
                    >
                      https://allaboutdnt.com
                    </Link>
                    .
                  </li>
                </ul>
              </div>
              {/* 6. Your Rights and Choices ends */}
              {/* 7. Data Security begins */}
              <H4 className="mt-8 mb-5">7. Data Security</H4>
              <p className="leading-7">
                We implement and maintain reasonable administrative, physical,
                and technical security safeguards to help protect information
                about you from loss, theft, misuse, unauthorised access,
                disclosure, alteration, and destruction. Nevertheless,
                transmission via the internet is not completely secure and we
                cannot guarantee the security of information about you.
              </p>
              {/* 7. Data Security ends */}
              {/* 8. Children begins */}
              <H4 className="mt-8 mb-5">8. Children</H4>
              <p className="leading-7">
                The Site is intended for general audiences and is not directed
                at children. To use the Site, you must legally be able to enter
                into the Agreement. We do not knowingly collect personal
                information from children.
              </p>
              {/* 8. Children ends */}
              {/* 9. Changes to Policy begins */}
              <H4 className="mt-8 mb-5">9. Changes to Policy</H4>
              <p className="leading-7">
                We reserve the right to revise and reissue this Privacy Policy
                at any time. Any changes will be effective immediately upon our
                posting of the revised Privacy Policy. For the avoidance of
                doubt, your continued use of the Site indicates your consent to
                the revised Privacy Policy then posted.
              </p>
              {/* 9. Changes to Policy ends */}
              {/* 10. Contact begins */}
              <H4 className="mt-8 mb-5">10. Contact</H4>
              <p className="leading-7">
                If you have any questions or comments about this Privacy Policy,
                our data practices, or our compliance with applicable law,
                please contact us at support@hey.xyz
              </p>
              {/* 10. Contact ends */}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
