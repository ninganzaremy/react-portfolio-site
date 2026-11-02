// Long-form posts ported from the legacy site. Slugs are fixed (they are in the sitemap).
// Bodies are JSX kept faithful to the originals; only obvious typos were fixed.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2024-11-05' -> 'Nov 5, 2024' (no timezone math, so the day never shifts) */
export function fmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export const posts = [
  {
    slug: 'java-reactive-programming',
    title: 'Getting Started with Java Reactive Programming',
    date: '2024-11-05',
    readTime: '3 min read',
    tags: ['Java', 'Reactive Programming', 'Spring Boot', 'WebFlux', 'Microservices'],
    image: '/img/blog/blog-post-7.png',
    excerpt:
      'Why non-blocking I/O matters, what Mono and Flux actually represent, and how to stand up a reactive REST API with Project Reactor and Spring WebFlux.',
    body: (
      <>
        <p>
          In today’s world, applications are required to handle increasingly high loads, often across distributed
          systems, without compromising performance. This demand has popularized reactive programming, an approach that
          emphasizes responsiveness, resilience, elasticity, and message-driven communication. In this guide, we’ll
          explore the core concepts of reactive programming in Java, its benefits, and dive into some practical examples
          to get you started.
        </p>

        <h2>What is Reactive Programming?</h2>
        <p>
          Reactive programming is a programming paradigm centered around asynchronous data streams. In a reactive
          system, components react to data as it arrives and propagate changes throughout the application in real-time.
          This is particularly useful for applications that require high throughput, low latency, and responsiveness
          even under heavy load, like stock trading platforms, chat applications, or real-time analytics.
        </p>
        <p>The principles of reactive programming are defined in the Reactive Manifesto, which emphasizes:</p>
        <ul>
          <li>
            <strong>Responsiveness</strong>: Systems should respond in a timely manner.
          </li>
          <li>
            <strong>Resilience</strong>: Systems should remain responsive under failure.
          </li>
          <li>
            <strong>Elasticity</strong>: Systems should remain responsive under varying load.
          </li>
          <li>
            <strong>Message-Driven Communication</strong>: Systems communicate via asynchronous message-passing.
          </li>
        </ul>

        <h2>Key Reactive Libraries in Java</h2>
        <p>Java has a robust ecosystem for reactive programming, including:</p>
        <ul>
          <li>
            <strong>Project Reactor</strong> (from Pivotal): The core library for building reactive applications in the
            Spring ecosystem.
          </li>
          <li>
            <strong>RxJava</strong>: A widely-used library for reactive programming inspired by ReactiveX.
          </li>
          <li>
            <strong>Vert.x</strong>: A polyglot toolkit for building reactive applications on the JVM.
          </li>
          <li>
            <strong>Akka</strong>: A toolkit that includes support for reactive, distributed, and highly scalable
            applications using the Actor model.
          </li>
        </ul>
        <p>
          In this article, we’ll focus on Project Reactor, as it integrates seamlessly with Spring WebFlux, a reactive
          web framework.
        </p>

        <h2>Why Use Reactive Programming in Java?</h2>
        <ul>
          <li>
            <strong>Non-blocking I/O</strong>: Unlike traditional, synchronous applications where threads can get
            blocked waiting for responses, reactive programming leverages non-blocking I/O, allowing the system to
            handle more operations simultaneously.
          </li>
          <li>
            <strong>Improved Scalability</strong>: By handling I/O operations asynchronously, reactive systems can
            manage a much larger number of concurrent users or connections without consuming as many system resources.
          </li>
          <li>
            <strong>Fault Tolerance</strong>: Built-in mechanisms for handling timeouts, retries, and fallbacks make
            reactive systems more resilient to failures.
          </li>
        </ul>

        <h2>Project Reactor Basics</h2>
        <p>
          Project Reactor, part of the reactive libraries from Spring, provides two main types of reactive publishers:{' '}
          <strong>Mono</strong> (represents a single value or no value) and <strong>Flux</strong> (represents a stream
          of multiple elements). Both are non-blocking and provide operators for composing data flows asynchronously.
        </p>

        <h2>Setting Up Project Reactor</h2>
        <p>
          To use Project Reactor in your Java project, include it in your <code>pom.xml</code> (for Maven):
        </p>
        <pre>
          <code>{`<dependencies>
    <dependency>
        <groupId>io.projectreactor</groupId>
        <artifactId>reactor-core</artifactId>
        <version>3.4.0</version>
    </dependency>
</dependencies>`}</code>
        </pre>
        <p>Or for Gradle:</p>
        <pre>
          <code>{`implementation 'io.projectreactor:reactor-core:3.4.0'`}</code>
        </pre>

        <h2>Creating Your First Reactive Application</h2>
        <p>
          Let's create a simple example to demonstrate how <code>Mono</code> and <code>Flux</code> work.
        </p>
        <pre>
          <code>{`import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class ReactiveDemo {
    public static void main(String[] args) {
        // Mono Example
        Mono<String> monoExample = Mono.just("Hello, Mono!");
        monoExample.subscribe(System.out::println); // Output: Hello, Mono!

        // Flux Example
        Flux<String> fluxExample = Flux.just("Hello", "Reactive", "Programming", "With", "Java");
        fluxExample.subscribe(System.out::println); // Outputs each word on a new line
    }
}`}</code>
        </pre>

        <h2>Using Reactive Operators</h2>
        <p>
          Reactor provides many operators to transform, filter, and combine reactive streams. Let’s look at a few
          commonly used ones.
        </p>

        <h3>Map and FlatMap</h3>
        <p>
          <strong>Map</strong>: Transforms each element in the stream.
          <br />
          <strong>FlatMap</strong>: Asynchronously transforms each element and returns a new stream.
        </p>
        <pre>
          <code>{`Flux<String> fluxExample = Flux.just("Java", "Spring", "Reactor")
    .map(String::toUpperCase)  // Transform each element to uppercase
    .flatMap(s -> Mono.just(s + " is cool!")); // Asynchronously modify each element

fluxExample.subscribe(System.out::println);`}</code>
        </pre>

        <h3>Filter</h3>
        <p>
          The <code>filter</code> operator filters elements based on a predicate.
        </p>
        <pre>
          <code>{`Flux<Integer> numbers = Flux.range(1, 10)
    .filter(num -> num % 2 == 0); // Only even numbers

numbers.subscribe(System.out::println); // Outputs 2, 4, 6, 8, 10`}</code>
        </pre>

        <h3>Zip</h3>
        <p>
          The <code>zip</code> operator combines multiple streams together.
        </p>
        <pre>
          <code>{`Flux<String> names = Flux.just("John", "Jane");
Flux<String> greetings = Flux.just("Hello", "Hi");

Flux<String> zipped = Flux.zip(names, greetings, (name, greeting) -> greeting + " " + name);
zipped.subscribe(System.out::println); // Output: Hello John, Hi Jane`}</code>
        </pre>

        <h2>Integrating with Spring WebFlux</h2>
        <p>
          Spring WebFlux is a fully asynchronous and non-blocking reactive web framework built on top of Project
          Reactor. Unlike Spring MVC, which uses synchronous, blocking I/O, WebFlux is designed for handling large
          volumes of concurrent requests without blocking threads.
        </p>

        <h2>Building a Reactive REST API with Spring WebFlux</h2>
        <p>To start, include WebFlux in your project:</p>
        <pre>
          <code>{`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>`}</code>
        </pre>

        <h3>Create a Controller</h3>
        <pre>
          <code>{`import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
@RequestMapping("/api")
public class ReactiveController {
    @GetMapping("/mono")
    public Mono<String> getMono() {
        return Mono.just("Hello from Mono!");
    }

    @GetMapping("/flux")
    public Flux<String> getFlux() {
        return Flux.just("Hello", "from", "Flux")
                   .delayElements(Duration.ofSeconds(1)); // Delay each element
    }
}`}</code>
        </pre>

        <h2>Handling Errors</h2>
        <p>
          Reactive programming in WebFlux also includes built-in error handling. For example, we can use{' '}
          <code>onErrorResume</code> to provide a fallback value in case of an error.
        </p>
        <pre>
          <code>{`@GetMapping("/error")
public Mono<String> errorExample() {
    return Mono.error(new RuntimeException("Something went wrong"))
               .onErrorResume(e -> Mono.just("Fallback response"));
}`}</code>
        </pre>

        <h2>Conclusion</h2>
        <p>
          Reactive programming is a powerful tool for building scalable, responsive, and resilient applications in
          Java. By using Project Reactor and Spring WebFlux, you can create applications capable of handling high loads
          and complex data streams with ease.
        </p>
      </>
    ),
  },
  {
    slug: 'no-code-low-code-future',
    title: 'The Future of Software is No-Code and Low-Code',
    date: '2022-10-06',
    readTime: '4 min read',
    tags: ['Low-Code', 'No-Code', 'App Development'],
    image: '/img/blog/blog-post-6.jpg',
    excerpt:
      'Demand for apps is outpacing the developers available to build them. Eight reasons no-code and low-code platforms are filling the gap.',
    body: (
      <>
        <h2>The power of no-code or low-code app development programs</h2>
        <p>
          IDC has reported that by 2023, more than 500 million apps will be developed. That is much more than decades
          of apps put together!
        </p>
        <p>
          In other words, the demand for digital transformation has triggered the rise of apps developed by businesses.
          There aren’t enough qualified developers or platforms to meet this demand. Also, there are drastic changes in
          the way we perceive technology. This has contributed massively to the embracing of no-code development. Let’s
          take a look at the nuances of this:
        </p>

        <h2>8 Reasons why no-code low-code platform adoption is taking off</h2>
        <ul>
          <li>
            <strong>Meeting the growing demand for enterprise apps</strong>
          </li>
        </ul>
        <p>
          According to Gartner, the market demand for app development services will grow at least 5x faster than IT
          capacity to deliver them. With no-code citizen development, the rapidly increasing demands of software
          development can be satisfied. No-code citizen app development frees up the headspace of developers to focus
          on critical issues.
        </p>
        <ul>
          <li>
            <strong>Cloud disruption has made technology accessible to all</strong>
          </li>
        </ul>
        <p>
          Remember those days when technology was only for the elite? Only large businesses could use it to develop
          apps and maintain the legacy. This was because it was exorbitantly expensive to buy the hardware and build
          applications. It was just as difficult and expensive to modify them. So, systems remained rigid. Small
          businesses suffered massively here due to the dependency and lack of funds.
        </p>
        <p>
          Today, thanks to the cloud, all you need is an Internet connection. Even a micro startup can build an app
          without worrying about costs or infrastructure. In fact, small businesses are doing it faster than large ones,
          forcing them to be a part of the change and use no-code platforms for agility. The tables have indeed turned!
        </p>
        <ul>
          <li>
            <strong>Goodbye legacy systems!</strong>
          </li>
        </ul>
        <p>
          The traditional legacy systems were not effective in that they were inflexible and difficult. The team could
          only fill data in spreadsheets or paper and send it over to the central office for filing. These steps
          increased the risk of errors and slowed down the entire process. Cloud has disrupted legacy systems and has
          brought flexibility in the workplace. With the rise of no-code, low-code citizen development teams now operate
          with transparency and automation, which is why you will barely ever come across errors. The whole process is
          faster as well.
        </p>
        <p>What’s more, this whole thing is customizable depending on changing needs. The dependency is almost zero!</p>
        <ul>
          <li>
            <strong>IT dependency has reduced!</strong>
          </li>
        </ul>
        <p>
          Traditional work models required the involvement of IT at every step. Developers decided everything about the
          application and the rest of the team accepted it. Cloud and no-code programming have flipped the model and
          reduced dependency on IT. Anyone can now turn into a creator (read citizen developers)!
        </p>
        <p>
          IT infrastructure and resources are also extremely expensive and most businesses cannot afford them.
          Cloud-based no-code programming is the perfect solution, thus. Further, this lessens the burden on developers
          to focus on the more complicated, operations-driven work in the company.
        </p>
        <ul>
          <li>
            <strong>Agility is the way to go!</strong>
          </li>
        </ul>
        <p>
          With the ever-evolving business conditions and changing customer needs, it is the need of the hour for
          businesses to become agile. Unlike traditional development, no-code/low-code platforms enable business users
          to make application changes quickly and easily. The simple drag-and-drop development ability of no-code
          platforms makes it effortless to update and redesign applications. This allows companies to take advantage of
          the market opportunities and do away with any risks.
        </p>
        <ul>
          <li>
            <strong>Utilizing internal resources!</strong>
          </li>
        </ul>
        <p>
          No-code, low-code platforms provide users the ability to build applications with an intuitive and easy-to-use
          design interface. This enables individuals to build apps without any extensive programming or coding
          knowledge.
        </p>
        <p>
          A company can assign individuals, who have first-hand experience on the issue, to build apps and solutions on
          their own without having to hire somebody from the outside. With the problem-solving ability and creativity
          at work for building apps, companies can ensure optimum utilization of internal resources.
        </p>
        <ul>
          <li>
            <strong>Lowering costs</strong>
          </li>
        </ul>
        <p>
          Gone are the days when you had to wait for a long time for the changes to be done on the apps or spend a big
          chunk of money creating solutions. Codeless application development will:
        </p>
        <ol>
          <li>Eliminate the need to hire expensive software developers</li>
          <li>Reduce the software development cycle period</li>
          <li>Carry low-maintenance costs for software</li>
        </ol>
        <ul>
          <li>
            <strong>Monitoring shadow IT</strong>
          </li>
        </ul>
        <p>
          In the bid to achieve faster and effective solutions, business users tend to switch to external software
          without consultation with the IT department. By providing the freedom to business users to develop any
          solution they need, no-code citizen development platforms eliminate the need to rely on security-threatening
          external solutions. Individuals can create solutions with consultation or collaboration with the IT
          department, ensuring increased visibility, collaboration, and mitigating risks.
        </p>
        <p>More benefits of no-code programming include:</p>
        <ol>
          <li>Faster application development</li>
          <li>Improving business functions</li>
          <li>High-quality output</li>
          <li>Fewer to no backlogs</li>
        </ol>
      </>
    ),
  },
  {
    slug: 'better-software-engineer',
    title: '5 Things to Do to Become a Better Software Engineer',
    date: '2022-10-05',
    readTime: '2 min read',
    tags: ['Software Engineering', 'Programming', 'Coding'],
    image: '/img/blog/blog-post-3.jpg',
    excerpt:
      'Learn the pain points of every layer, work in codebases you did not write, debug on your own, and keep coding even when your role pulls you away from it.',
    body: (
      <>
        <h2>Familiarize yourself with the pain points of every part of the stack.</h2>
        <p>
          Don’t be the backend engineer who trivializes the work of frontend engineers; similarly, don’t be the
          frontend engineer who doesn’t get the performance constraints backend engineers have to deal with.
        </p>
        <h2>Work in multiple codebases, maintained by different types of engineers.</h2>
        <p>
          It’s easy to get siloed to one codebase (your main codebase) and to be cocooned by its familiarity. Seeking
          out different codebases, with different practices and styles, will make you a more well-rounded software
          engineer.
        </p>
        <h2>Prepare for interviews</h2>
        <p>
          Use AlgoExpert to prepare for your technical interviews, but this one is too obvious, so let’s go with a
          second number 3.
        </p>
        <h2>Learn how to debug</h2>
        <p>
          Develop your ability to resolve issues and bugs on your own with the help of Google and documentation. While
          I’m a big advocate of quickly seeking out help when you run into an issue, it’s important to realize that you{' '}
          <em>can</em> ultimately figure most things out on your own; you just have to intentionally develop this
          skill—a lot.
        </p>
        <h2>Have a software engineer mindset</h2>
        <p>
          Internalize the fact that one of your main responsibilities as a software engineer is to write code that is
          maintainable. As the adage goes, “Always code as if the guy who ends up maintaining your code will be a
          violent psychopath who knows where you live”.
        </p>
        <h2>Code a lot</h2>
        <p>
          Especially if your career path is making you code less (i.e., you’re in a very senior role, you’re in a more
          managerial role, you’re in a more product-focused role). Coding is a practiced skill, and it’s easy to get
          rusty at it. The good news is that it’s just as easy to get rid of the rust.
        </p>
      </>
    ),
  },
  {
    slug: 'become-a-software-engineer',
    title: 'How to Become a Software Engineer',
    date: '2022-10-02',
    readTime: '2 min read',
    tags: ['Software Engineer', 'Career', 'Tech Interview'],
    image: '/img/blog/blog-post-2.jpg',
    excerpt:
      'Plan the career path, pick an education route (bootcamp, college or self-directed), then stack experience, certifications and a portfolio before applying.',
    body: (
      <>
        <h2>Planning your career path</h2>
        <p>
          Though many software engineering (or coding) skills are transferable between roles, aspiring software
          engineers should have a career trajectory in mind. After all, the term “coding” can encompass a variety of
          different positions; understanding the distinction between software engineering and related fields such as
          web programming is crucial during the initial career planning stage.
        </p>
        <p>
          As the name suggests, software engineering generally refers to the creation and implementation of computer
          software and utility programs. Software engineers use their comprehensive knowledge of computer science and
          mathematics to develop software products that suit users’ digital needs. Web developers, on the other hand,
          focus primarily on coding websites. These professionals are tasked with creating and maintaining everything
          from layouts and functions to navigation and overall usability.
        </p>
        <p>
          Once you have a clear idea of your intended career path, you can start navigating it. With that in mind, now
          let’s continue our discussion on how to become a software engineer.
        </p>

        <h2>Obtaining an education</h2>
        <p>
          Generally speaking, there are three main paths aspiring software engineers can take to pursue their
          education: coding bootcamps, college, and self-directed learning. The option you choose will be contingent on
          your preferences as a learner and your lifestyle circumstances (such as schedule conflicts, intended
          timelines, financial resources, etc.).
        </p>
        <p>Each route comes with its own set of pros and cons, so consider them carefully before enrolling in an academic course!</p>
        <p>Now, let’s assess the educational options which may help you become a software developer from scratch.</p>
        <ul>
          <li>
            <em>Coding bootcamp:</em>
          </li>
        </ul>
        <p>
          By attending a coding bootcamp, you’ll have the opportunity to gain a set of job-ready programming skills
          through an accelerated curriculum. Software engineering is challenging to learn from scratch — but with a
          bootcamp, even industry newcomers can build a strong knowledge base and ready themselves for an entry-level
          role quickly if they are willing to put in the time, hard work, and dedication.
        </p>
        <p>
          Coding bootcamps may be worth it for those who don’t have the time or resources to attend a four-year degree
          program. These courses last just three to six months, depending on whether you opt for a part- or full-time
          schedule, and are often cheaper than multi-year degree programs. Bootcamps are also highly flexible; many
          offer virtual, in-person, and weekend options to suit working professionals’ scheduling needs.
        </p>
        <p>
          That said, because bootcamps tend to focus on web-based coding rather than software engineering, a coding
          bootcamp may not be the best choice for someone who wants to land a job in the latter field as soon as they
          complete their formal education.
        </p>
        <p>
          But if you want to develop your coding fundamentals and start gaining work experience as soon as possible, you
          should still consider enrolling in a coding bootcamp geared toward helping you become a full stack developer.
          Such a course will provide you with a “full stack” of back end (server-side) and front end (client-side)
          programming skills. Having this foundation will better equip you to hit the ground running as an entry-level
          professional and start accumulating real job experience — which you can then use to springboard into software
          engineering.
        </p>
        <ul>
          <li>
            <em>College education:</em>
          </li>
        </ul>
        <p>
          College is far and away the most popular educational route among developers today. In 2020, Stack Overflow
          found that nearly 75 percent of surveyed developers had achieved at least the equivalent of a bachelor’s
          degree or higher, remaining consistent with numbers observed in previous years.
        </p>
        <p>
          Four-year degree programs are popular for a reason: they cover computer science theory and practice, provide
          communal learning environments, offer access to supportive instructors, and facilitate networking
          opportunities. These university degree programs are also usually well-regarded by employers.
        </p>
        <p>
          However, a college education can be less economical than a bootcamp, and a degree isn’t strictly necessary
          to become a software engineer, though you’ll often have to work harder to achieve your goals. The same survey
          also found that just over 20 percent of professional developers did not have an undergraduate degree. Roughly
          16 percent of surveyed developers also described college degrees as “not at all important” or “not
          necessary.”
        </p>
        <p>
          In summary — while college can be a fantastic option for those who have the time and resources to attend, it
          is not a be-all-end-all academic requirement for everyone wondering how to become a software engineer.
        </p>
        <ul>
          <li>
            <em>Self-directed learning:</em>
          </li>
        </ul>
        <p>
          There is also a range of self-directed learning opportunities to explore for those who prefer less formal
          academic options. For instance, learners can pick up necessary coding skills via free educational websites
          like Khan Academy and freeCodeCamp. In addition to being cost-effective, these classes are designed to suit
          self-guided instruction and scheduling, making them highly personalized by default.
        </p>
        <p>
          But the flexibilities provided by self-directed learning come at a cost. Those who choose to learn
          independently don’t have the accountability a set schedule or formal instructor offers; rather they are
          responsible for keeping themselves on track and productive. While this approach may work well for some, those
          who are less self-motivated may find themselves falling behind on their upskilling timetable.
        </p>

        <h2>Gaining experience</h2>
        <p>
          Your skills training shouldn’t start and end with formal classes! Aspiring software engineers will want to
          accrue hands-on experience through volunteer work, personal projects, internships, and other practical work
          opportunities. Practicing your coding skills outside of the classroom will allow you to pad out your resume,
          add items to your professional portfolio, and otherwise improve your standing during the job search.
        </p>
        <p>
          Not sure where to start? If you’re attending a college program or bootcamp, you may want to reach out to your
          institution’s alumni affairs office to see if they can connect you with any open internship or placement
          opportunities. Alternatively, you can check out a few of the resources below for inspiration!
        </p>
        <p>Additional resources:</p>
        <ol>
          <li>Code 4 Good — American Red Cross</li>
          <li>Hackathon Opportunities — Second Muse</li>
          <li>How to Find a Software Developer Internship as a Student — freeCodeCamp</li>
        </ol>

        <h2>Getting certified</h2>
        <p>
          Want to maximize your chances of being chosen by employers? You may want to consider earning a certification.
          Certificates are valuable in today’s professional climate, as they quickly confirm your experience to
          employers seeking top-level candidates. Being certified may help you rise above other applicants when
          potential employers sift through resumes.
        </p>
        <p>Below, we’ve listed a few certifications that might benefit an entry-level software engineer.</p>
        <p>Additional resources:</p>
        <ol>
          <li>AWS Certified Developer (Associate) — Amazon Web Services</li>
          <li>Java Certification — Oracle University</li>
          <li>Professional Scrum Developer — Scrum.org</li>
        </ol>

        <h2>Building your portfolio</h2>
        <p>
          A coding portfolio is a crucial asset for all aspiring software engineers seeking employment. This
          comprehensive body of work is often the first impression job recruiters have of you. It is a great way to
          showcase your past projects, too; these can convey your versatility and general know-how as a work-ready
          software engineer.
        </p>
        <p>
          As an interested candidate, your job is to provide as much evidence of your abilities as possible — so take
          time to build out your portfolio accordingly! When summarizing projects, be sure to include detailed
          descriptions of all technologies utilized, roles you served, and any other relevant information about your
          process and ideology.
        </p>
        <p>Additional resources:</p>
        <ol>
          <li>5 Rules for Writing a Software Engineer Resume That Will Get You Hired — The Muse</li>
          <li>An Honest Guide to Building a Powerful Developer Portfolio — Better Programming</li>
          <li>How to Prepare For &amp; Succeed In a Coding Interview — Glassdoor</li>
        </ol>

        <h2>Applying for jobs</h2>
        <p>
          Once you’ve sought out proper training and certification, dabbled in projects, and prepared a layered
          portfolio, you’ll be ready to apply for software engineering positions. Start by mapping out your career
          goals, pinpointing jobs you would prefer based on your experiences to date; this will help you narrow down
          compatible opportunities early into your application process. Update your resume, LinkedIn profile, and other
          relevant application materials to ensure that potential employers have an up-to-date snapshot of your skills
          and capabilities.
        </p>
        <p>
          It is essential to remain confident and not limit yourself during this time. The sheer number of different
          roles can be overwhelming at first, but as you test the waters, keep in mind that your right fit is out there
          — it just might take some time to find it!
        </p>
      </>
    ),
  },
  {
    slug: 'tech-interview-mistakes',
    title: 'The Biggest Mistakes to Avoid When Preparing for Tech Interviews',
    date: '2022-09-06',
    readTime: '2 min read',
    tags: ['Software Engineering', 'Programming', 'Coding'],
    image: '/img/blog/blog-post-4.jpg',
    excerpt:
      'Six preparation mistakes that cost candidates offers, from skipping the categories you think you already know to ignoring the behavioral round.',
    body: (
      <>
        <ol>
          <li>Disregarding categories that you’re supposedly good in</li>
          <li>Coding with a language you don't know well</li>
          <li>Not practicing with a whiteboard/“scratchpad” text editor</li>
          <li>Not leveraging the recruiter</li>
          <li>Under-communicating while practicing</li>
          <li>Ignoring the behavioral interviews</li>
        </ol>
      </>
    ),
  },
  {
    slug: 'aws-certified-developer-associate',
    title: 'How I Passed the AWS Certified Developer Associate Exam',
    date: '2022-09-01',
    readTime: '3 min read',
    tags: ['AWS Developer', 'Amazon SDE', 'Coding', 'Cloud'],
    image: '/img/blog/blog-post-5.jpg',
    excerpt:
      'Sixty days, four or five hours a day, one course, three whitepapers and a stack of practice exams. The routine that got me through the DVA exam.',
    body: (
      <>
        <h2>Establish a learning routine</h2>
        <p>
          We're all busy in our daily lives. Always something to do and never enough time. Preparing for the AWS
          Certified Developer Associate takes time and commitment.
        </p>
        <p>
          According to Andrew Brown, it can take up to 2 months of study to pass this exam. You need to get your hands
          dirty to understand all the concepts discussed in the course, contrary to the AWS Certified Cloud Practitioner
          or AWS Certified Solutions Architect Associate certs.
        </p>
        <p>
          It took me 60 days to complete my exam preparation, but that's not the point. What matters is your commitment
          to learning every day.
        </p>
        <p>
          I progressed by baby steps. From Monday to Saturday. Each day, I dedicated myself 4 or 5 hours to the task.
          For sure, you can spend less time. The most important thing is to find what is best for you and work
          regularly.
        </p>
        <p>My preparation was divided into 4 steps:</p>
        <ol>
          <li>Watch 2 or 3 sections of the course while taking notes</li>
          <li>Deep dive into things I didn't understand</li>
          <li>Study hard</li>
          <li>Take practice exams</li>
        </ol>

        <h2>Study hard and take practice exams</h2>
        <p>
          I used the Ultimate AWS Certified Developer Associate 2022 course developed by Stephane Maarek. It's a 32
          hours on-demand video which helps you to understand AWS and practice with Follow Along sections. Stephane
          Maarek did tremendous work. His explanations are very clear and go straight to the point.
        </p>
        <p>
          Sometimes you'll be frustrated to not understand something. I remember being stuck all afternoon with the
          first Follow Along. I even thought about skipping it because it was so demotivating.
        </p>
        <p>
          The next day, after a good night of sleep, I spent all day debugging the code. I even submitted a pull request
          to help others. Solving this issue helped me deep dive into things I didn't understand and motivated me to
          write other AWS stories to consolidate my knowledge.
        </p>
        <p>
          After completing the course, you might feel the need to supplement what you learned. You can read the AWS
          whitepapers recommended by Andrew Brown.
        </p>
        <p>In my case, I read the following ones:</p>
        <ul>
          <li>Practicing Continuous Integration and Continuous Delivery on AWS: Accelerating Software Delivery with DevOps</li>
          <li>Microservices on AWS</li>
          <li>Architecting for the Cloud: AWS Best Practices</li>
        </ul>
        <p>
          It was my first time reading AWS whitepapers. I must admit I was pleasantly surprised! It helped me a lot to
          understand the things I was missing and gave me the confidence to book my exam.
        </p>
        <p>
          If you're curious about how to schedule your online exam, you can watch Marcia Villalba's YouTube video. She
          explains everything you need to know to avoid stressing yourself out too much.
        </p>
        <p>Something worth mentioning: AWS gives you a 50% discount for booking your next exam when you pass one!</p>
        <p>
          A few days before your exam, I strongly recommend you train with practice exams. You can find them easily on
          the Internet. Andrew Brown gave me access to ExamPro to take the Developer Associate Practice Exam.
        </p>
        <p>
          The practice exam was challenging. It's close to the real exam. You have 2 hours to answer 65 questions and
          the clock is ticking. After submitting your practice exam, your score is displayed. Most importantly, you can
          review your wrong answers and read the explanations to understand why you made these mistakes.
        </p>
        <p>
          If you failed your practice exam, be sure to review your questions/answers first before taking the same
          practice exam. It will improve your confidence for the real exam.
        </p>
        <p>
          I was able to pass the AWS Certified Developer Associate exam. All this requires time, patience, and
          dedication. I'm not special, you can do it too. It won't be easy at first but it's worth doing.
        </p>
      </>
    ),
  },
  {
    slug: 'passive-income-software-engineer',
    title: '8 Ideas for Passive Income as a Software Engineer',
    date: '2022-07-11',
    readTime: '2 min read',
    tags: ['Software Engineering', 'Coding', 'Money'],
    image: '/img/blog/blog-post-1.jpg',
    excerpt:
      'From the day job to affiliate marketing, YouTube, newsletters, small paid products and consulting: an honest look at how passive each option really is.',
    body: (
      <>
        <h2>Get a normal job as a software engineer</h2>
        <p>
          Obvious, but this is the simplest and arguably the highest-EV (expected value) way of making money with
          coding. And as you get promoted, you command more $ for the same hours of work, which can be viewed as a form
          of passive income.
        </p>
        <h2>Launch an affiliate marketing business</h2>
        <p>
          Affiliate marketing is a business model where brands share revenue with publishers and content creators in
          exchange for leads and sales. It works similarly to a salesperson being paid a commission for a successful
          sale. The more sales you make, the more money you earn. Affiliate commissions can range from cents on the
          dollar to hundreds of dollars per referral. Done right, affiliate marketing could help you earn more than your
          current job or diversify the revenue of an existing content business.
        </p>
        <h2>Grow a YouTube channel</h2>
        <p>
          While the initial stages of growing on YT require a lot of active work, videos are indeed everlasting and can
          lead to truly passive income. But you’ll need to actively post to keep your channel relevant.
        </p>
        <h2>Grow a newsletter</h2>
        <p>
          Similar to growing a YouTube channel, except less passive, since it requires consistently pumping out content
          to retain paid subscribers.
        </p>
        <h2>Build a small paid product</h2>
        <p>
          Building something (phone app, Chrome extension, SaaS offering) that requires a big initial investment but
          little to no maintenance afterwards. Much easier said than done, especially if it has to make substantial
          income, but this can actually lead to passive income.
        </p>
        <h2>Build a video course</h2>
        <p>
          Similar to 6) in that it requires a big initial investment with little maintenance afterwards—assuming it’s
          genuinely just a video course and not an actual platform—but it’s difficult to do. You need reach and a
          competitive edge in a saturated market.
        </p>
        <h2>Do consulting work</h2>
        <p>
          The opposite of passive, but worth mentioning. And if you’re thinking of building a consulting <em>agency</em>,
          great, but refer back to 2).
        </p>
        <h2>Do freelance work</h2>
        <p>Similar to 1), but probably more like supplemental income.</p>
      </>
    ),
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export default posts;
