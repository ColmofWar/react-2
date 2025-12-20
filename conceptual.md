### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  To handle navigation and routing in a React single-page application.  This will allow multi-page user experience complete with URL on a single HTML page load.

- What is a single page application?
  A single HTML page that loads all functionality of the application at once.   Using a react router to simulate URLs and routing for a multi page user experience.

- What are some differences between client side and server side routing?
  Client side routing is done on the users browser, and it will download all the content up accessing the app.  While Server side routing is done by a server.  Each page is downloaded individually, causing a full page refresh between pages.

- What are two ways of handling redirects with React Router? When would you use each?
  Programmatic redirecting using the useNavigate hook or by a declarative redirect with Navigate component

- What are two different ways to handle page-not-found user experiences using React Router? \
  You can create a 404 component and define a cath-all route using the path * at the end of your route definitions.  You can also us e an errorElement prop for whenever a loader/action throws a 404 status.

- How do you grab URL parameters from within a component using React Router?
  From within a functional component using the useParams hook, you can grab the URL parameters.

- What is context in React? When would you use it?
  Context is a mechanism that allows you to share data deeply within the component tree without manually passing props down at every level.  Reasons to use this include: Theme management, user authentication, global settings and configurations that rarely change, and localization such as language settings.
  
- Describe some differences between class-based components and function
  components in React.
  Functional components are a more modern reccommended standard for react development.  It offers a simpler syntax and better code reuse through hooks.  It uses the useState hook for state management.  The lifecycle of methods is managed by the useEffect hook.  The Class-based components is still supported but more niche.  It heavily utilizes the keyword "this" as a form of acccessing the pops, state, and methods.  It uses this.state and this.setState() methods to manage the state.  I uses specific methods to manage the lifecycle.

- What are some of the problems that hooks were designed to solve?
  Primarily, hooks were designed to solve several issues with state management in functional components.  Its goal was to simplify how to share logic.  This helps end wrapper hell and prop drilling.  This improved readability.  Complex class components that required this binding and management of lifecylcles were solved by switching to functional components with hooks.