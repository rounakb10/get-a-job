import { Link } from "react-router-dom"
import main from "../assets/images/main-2.svg"
import Wrapper from "../assets/wrappers/Testing"
import { Logo } from "../components"
function Landing() {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job <span>tracking</span>
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ducimus dignissimos rerum vitae harum dolor blanditiis,
						itaque, facilis magni recusandae tempore, error
						excepturi maxime. In nam facilis quis nisi sit pariatur.
					</p>
					<Link to='/register'>
						<button className='btn btn-hero'>Login</button>
					</Link>
				</div>
				<img
					src={main}
					alt='A person looking for a job'
					className='img main-img'
				/>
			</div>
		</Wrapper>
	)
}

// const Wrapper = styled.main`
// 	nav {
// 		width: var(--fluid-width);
// 		max-width: var(--max-width);
// 		margin: 0 auto;
// 		height: var(--nav-height);
// 		display: flex;
// 		align-items: center;
// 	}
// 	.page {
// 		min-height: calc(100vh - var(--nav-height));
// 		display: grid;
// 		align-items: center;
// 		margin-top: -3rem;
// 	}
// 	h1 {
// 		font-weight: 700;
// 		span {
// 			color: var(--primary-500);
// 		}
// 	}
// 	p {
// 		color: var(--grey-600);
// 	}
// 	.main-img {
// 		display: none;
// 	}
// 	@media (min-width: 992px) {
// 		.page {
// 			grid-template-columns: 1fr 1fr;
// 			column-gap: 3rem;
// 		}
// 		.main-img {
// 			display: block;
// 		}
// 	}
// `

export default Landing
