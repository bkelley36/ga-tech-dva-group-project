import { InformationCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

import ganttChartImage from '../../public/images/met-gantt-chart.jpg'

export default function Proposal() {
  return (
    <Layout>
      <Seo templateTitle='Proposal' />
      <div className='bg-white py-32 px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-base leading-7 text-gray-700'>
          <p className='text-base font-semibold leading-7 text-rose-600'>
            Proposal
          </p>
          <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Tour Recommendation and Optimization at The Metropolitan Art Museum
          </h1>
          <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
            Summary
          </h2>
          <div className='mt-10 max-w-2xl'>
            <p>
              The Metropolitan Art Museum is the largest and most visited museum
              in North America with a permanent collection of over two million
              pieces of artwork. With such a large collection and a deluge of
              daily visitors, it can often prove overwhelming to plan and
              personalize a visit. This project offers an all-in-one solution.
              We propose an approach to optimize a tour route through the
              Metropolitan Art Museum based on user input parameters such as
              visit time, art piece popularity, favorite artists, favorite art
              pieces, preferred art styles, preferred art mediums, etc. This
              will be achieved through the use of a route optimization algorithm
              that will return a path that minimizes the distance between art
              pieces selected via user input that queries a database of works
              currently housed by the museum. <b>(Q1)</b>
            </p>
            <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
              Background
            </h2>
            <p className='mt-6'>
              Modern research in route optimization and recommendation systems
              is proving useful in the design of this project. Research suggests
              that similarly sized rooms in a museum can exhibit drastically
              different viewership retention times <sup>1</sup>. Routing through
              said rooms can be achieved via algorithm. Most of these routing
              algorithms work by identifying a start point, goal point, and
              defining objective functions based on cost; each with different
              complexities and accuracies <sup>2</sup>. Promising potential
              algorithms for this project include: A star, a common and popular
              algorithm that tends to be very fast with good accuracy{' '}
              <sup>3</sup>; and popular adaptations to it including: Dynamic
              Anti-Collision A-Star <sup>4</sup> and Hierarchical NavMesh
              Path-finding <sup>5</sup>. Another option is the modified adaptive
              large neighborhood search algorithm. In tourism research, it has
              been found to achieve a balance of satisfaction and visit stop
              requirements for multiple family members of different genders and
              ages <sup>6</sup>. An A star algorithm adjusted to our
              specifications will likely be used for this project. While a
              method for routing is crucial, the recommendation of endpoints is
              equally important. One approach to recommendation at tourism sites
              is based on reviews of attractions on social media websites{' '}
              <sup>7</sup>. For artwork recommendation, approaches utilizing a
              combination of artist preference, curated attributes, neural
              visual features, and manually-engineered visual features;
              <sup>8</sup> or classification via support vector machines and
              artificial neural networks have proved successful <sup>9</sup>.
              Storage and access of artwork locations is critical to these
              systems. SQL cluster databases tend to perform better when running
              large queries whereas an alternative, MongoDB, does better for
              small queries <sup>10</sup>. An SQL cluster database will likely
              be used for this project. The display of results is also an
              important aspect of this project. One option is to create an
              interactive website. Key factors that should be considered in this
              regard are navigation, graphics, organization, content utility,
              purpose, simplicity and readability <sup>11</sup> as well as
              primacy and recency in terms of menu design <sup>12</sup>. If a
              map is displayed, research suggests that interactivity benefits
              from low level detail contents with contrasting overlay features{' '}
              <sup>13</sup>. These are all factors that will be considered in
              the design of this project’s interactive visualization.{' '}
              <b>(Q2)</b>
            </p>
            <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
              Novelty of Approach and Expected Innovations
            </h2>
            <p className='mt-6'>
              The Metropolitan Art museum receives millions of visitors a year,
              a large group being composed of art students, academic scholars,
              and enthusiasts. Many visitors spend days in just one section
              revolving around a common theme. The tools currently available are
              not sufficient to make the most of their limited time{' '}
              <sup>14</sup>. This new approach will allow visitors to specify
              their interests and quickly generate a route that will optimize
              their visit time. Guests can now spend more time enjoying and
              studying the art on display while experiencing the 4Es (education,
              esthetic, entertainment, and escapist experience) which have
              significant impact on satisfaction <sup>15</sup>. This item is not
              just of value to visitors, museum curators and staff should find
              great value in it as well. A highly requested item for museums are
              better maps or guides <sup>16</sup>. Shortening trip times and
              avoiding overcrowding is especially desirable to museum managers
              due to the Covid-19 pandemic <sup>17</sup>. This recommendation
              and route optimization system will potentially help the museum
              provide a much improved experience to visitors whilst limiting
              overcrowding and the spread of disease. <b>(Q3, Q4)</b>
              <br />
              <br />
              With a successful implementation of this model, the museum can
              expect to see improvements in its customer ratings and reviews,
              greater interaction, and reduced overcrowding. This will be
              measured from the adoption rate, change in customer reviews,
              visitor counts, and usage details of the app/website based on this
              program. In terms of risks and payoffs, the risks amount to the
              time and funding required to create and distribute the website to
              a large audience. The payoffs will be an increase in customer
              satisfaction which can lead to more recommendations to visit the
              museum and repeat visits 18. The project will likely have a cost
              of $0, due to bootstrapping free tier services. The time to
              complete the project is approximately three months.{' '}
              <b>(Q5, Q6, Q7, Q8)</b>
            </p>
            <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
              Plan of Activities
            </h2>
            <p className='mt-6'>
              Tracking progress is important to achieve project goals. Midterm
              progress requirements and final requirements have been created and
              can be found in the Gantt Chart below. The workflow will likely
              follow this progression: Digitize the museum map, setup web
              hosting and a github repo, determine optimization algorithm basis
              input criteria, design experiments, finalize a working model, and
              presentation of the project. At this point, all team members have
              contributed an equal amount of effort and will continue to do so
              following this workflow. <b>(Q9)</b>
            </p>
            <br />
            <Image
              className=''
              src={ganttChartImage}
              width={1484}
              height={592}
              alt='Gantt Chart'
            />
          </div>
          <div className='mt-16 max-w-2xl'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
              Works Cited
            </h2>
            <p className='mt-6'>
              <b>1.</b> Centorrino, P., Corbetta, A., Cristiani, E., & Onofri,
              E. (2021). Managing crowded museums: Visitors flow measurement,
              analysis, modeling, and optimization. Journal of Computational
              Science, 53, Article 101357.
              https://doi.org/10.1016/j.jocs.2021.101357
              <br />
              <br />
              <b>2.</b> Rowe, N. C., & Alexander, R. S. (2000). Finding
              optimal-path maps for path planning across weighted regions.
              International Journal of Robotics Research, 19(2), 83-95.
              https://doi.org/10.1177/02783640022066761
              <br />
              <br />
              <b>3.</b> Foead, D., Ghifari, A., Kusuma, M. B., Hanafiah, N., &
              Gunawan, E. (2020, Nov 19-20). A Systematic Literature Review of
              A* Pathfinding.Procedia Computer Science [5th international
              conference on computer science and computational intelligence
              2020]. 5th International Conference on Computer Science and
              Computational Intelligence (ICCSCI), Electr Network.
              <br />
              <br />
              <b>4.</b> He, Z. B., Liu, C. G., Chu, X. M., Negenborn, R. R., &
              Wu, Q. (2022). Dynamic anti-collision A-star algorithm for
              multi-ship encounter situations. Applied Ocean Research, 118,
              Article 102995. https://doi.org/10.1016/j.apor.2021.102995
              <br />
              <br />
              <b>5.</b>Pelechano, N., & Fuentes, C. (2016). Hierarchical
              path-finding for Navigation Meshes (HNA*). Computers &
              Graphics-Uk, 59, 68-78. https://doi.org/10.1016/j.cag.2016.05.023
              <br />
              <br />
              <b>6.</b>Khamsing, N., Chindaprasert, K., Pitakaso, R., Sirirak,
              W., & Theeraviriya, C. (2021). Modified ALNS Algorithm for a
              Processing Application of Family Tourist Route Planning: A Case
              Study of Buriram in Thailand. Computation, 9(2), Article 23.
              https://doi.org/10.3390/computation9020023
              <br />
              <br />
              <b>7.</b>Abbasi-Moud, Z., Vahdat-Nejad, H., & Sadri, J. (2021).
              Tourism recommendation system based on semantic clustering and
              sentiment analysis. Expert Systems with Applications, 167, Article
              114324. https://doi.org/10.1016/j.eswa.2020.114324
              <br />
              <br />
              <b>8.</b>Messina, P., Dominguez, V., Parra, D., Trattner, C., &
              Soto, A. (2019). Content-based artwork recommendation: integrating
              painting metadata with neural and manually-engineered visual
              features. User Modeling and User-Adapted Interaction, 29(2),
              251-290. https://doi.org/10.1007/s11257-018-9206-9
              <br />
              <br />
              <b>9.</b> Xu, F., Wu, T., Huang, S. L., Han, K. T., Lin, W. W.,
              Wu, S. Z., . . . Samuel, R. D. J. (2021). Extensive Classification
              of Visual Art Paintings for Enhancing Education System using
              Hybrid SVM-ANN with Sparse Metric Learning based on Kernel
              Regression. International Journal of Interactive Multimedia and
              Artificial Intelligence, 7(2), 224-231.
              https://doi.org/10.9781/ijimai.2021.10.001
              <br />
              <br />
              <b>10.</b> Wang, S. C., Pandis, I., Wu, C., He, S. J., Johnson,
              D., Emam, I., . . . Guo, Y. K. (2014). High dimensional biological
              data retrieval optimization with NoSQL technology. Bmc Genomics,
              15, Article S3. https://doi.org/10.1186/1471-2164-15-s8-s3
              <br />
              <br />
              <b>11.</b> Garett, R., Chiu, J., Zhang, L., & Young, S. D. (2016).
              A Literature Review: Website Design and User Engagement. Online
              Journal of Communication and Media Technologies, 6(3), 1-14.
              <br />
              <br />
              <b>12.</b> DeWitt, A. J. (2010). Examining the Order Effect of
              Website Navigation Menus With Eye Tracking. Journal of Usability
              Studies, 6(1), 39-47.
              <br />
              <br />
              <b>13.</b>Bartling, M., Robinson, A. C., Resch, B., Eitzinger, A.,
              & Atzmanstorfer, K. (2021). The role of user context in the design
              of mobile map applications. Cartography and Geographic Information
              Science, 48(5), 432-448.
              https://doi.org/10.1080/15230406.2021.1933595
              <br />
              <br />
              <b>14.</b>Yan, L. (2022). Improved on-demand travel route planning
              model with interest fields. Computational Intelligence and
              Neuroscience, 2022, 1–12. https://doi.org/10.1155/2022/6442441
              <br />
              <br />
              <b>15.</b>Quadri-Felitti, D. L., & Fiore, A. M. (2013).
              Destination loyalty: Effects of wine tourists’ experiences,
              memories, and satisfaction on intentions. Tourism and Hospitality
              Research, 13(1), 47-62.
              <br />
              <br />
              <b>16.</b>Giacomo Del Chiappa, Maria Gabriela Ladu, Marta Meleddu
              & Manuela Pulina (2013) Investigating the degree of visitors'
              satisfaction at a museum, Anatolia, 24:1, 52-62, DOI:
              10.1080/13032917.2012.762317
              <br />
              <br />
              <b>17.</b>Pacurar, C. M., Albu, R. G., & Pacurar, V. D. (2021).
              Tourist Route Optimization in the Context of Covid-19 Pandemic.
              Sustainability, 13(10), Article 5492.
              https://doi.org/10.3390/su13105492
              <br />
              <br />
              <b>18.</b> Daskalaki, V.V., Voutsa, M.C., Boutsouki, C. &
              Hatzithomas, L (2020). Service quality, visitor satisfaction and
              future behavior in the museum sector. Journal of Tourism, Heritage
              & Services Marketing, ISSN 2529-1947, Vol. 6, No. 1, pp. 3-8.
              http://dx.doi.org/10.5281/zenodo.3603167
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
