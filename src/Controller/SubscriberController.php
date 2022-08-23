<?php

namespace App\Controller;

use App\Entity\Subscriber;
use App\Form\SubscriberFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;

class SubscriberController extends AbstractController
{
    /**
     * @Route("/show")
     */
    public function show(Environment $twig, Request $request, EntityManagerInterface $entityManager)
    {
        $subscriber = new Subscriber();

        $form = $this->createForm(SubscriberFormType::class, $subscriber);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $entityManager->persist($subscriber);
            $entityManager->flush();

            return new Response('New Subscriber '.$subscriber->getId().' is created');

        }

        return new Response($twig->render('subscriber/show.html.twig',[
            'subscriber_form' => $form->createView()
        ]));

    }

}